import gradio as gr
import requests
from typing import List, Optional, Tuple
from datetime import datetime

class ChatAPI:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        
    def create_conversation(self) -> str:
        response = requests.post(f"{self.base_url}/v1/conversations")
        return response.json()["conversation_id"]
    
    def delete_conversation(self, conversation_id: str) -> None:
        requests.delete(f"{self.base_url}/v1/conversations/{conversation_id}")
    
    def send_message(self, conversation_id: str, message: str) -> str:
        response = requests.post(
            f"{self.base_url}/v1/conversations/{conversation_id}/messages",
            json={"content": message}
        )
        return response.json()["content"]
    
    def get_conversation(self, conversation_id: str) -> List[dict]:
        response = requests.get(f"{self.base_url}/v1/conversations/{conversation_id}")
        return response.json()["messages"]

class ChatInterface:
    def __init__(self):
        self.api = ChatAPI()
        self.conversations: List[str] = []
        
    def create_new_conversation(self) -> Tuple[gr.Dropdown, str, List[Tuple[str, str]]]:
        """Create a new conversation and update the UI"""
        conv_id = self.api.create_conversation()
        self.conversations.append(conv_id)
        return (
            gr.Dropdown(choices=self.conversations, value=conv_id),
            f"Created new conversation: {conv_id}",
            []  # Clear chat history
        )
    
    def delete_current_conversation(
        self, conv_id: Optional[str]
    ) -> Tuple[gr.Dropdown, str, List[Tuple[str, str]]]:
        """Delete the current conversation and update the UI"""
        if not conv_id:
            return (
                gr.Dropdown(choices=self.conversations),
                "No conversation selected",
                []
            )
            
        self.api.delete_conversation(conv_id)
        self.conversations.remove(conv_id)
        return (
            gr.Dropdown(choices=self.conversations, value=None),
            f"Deleted conversation: {conv_id}",
            []  # Clear chat history
        )
    
    def chat(
        self, message: str, history: List[Tuple[str, str]], conv_id: Optional[str]
    ) -> Tuple[List[Tuple[str, str]], List[Tuple[str, str]]]:
        """Send a message and update the chat history"""
        if not conv_id:
            raise gr.Error("Please select or create a conversation first")
            
        response = self.api.send_message(conv_id, message)
        history.append((message, response))
        return history, ""
    
    def load_conversation(
        self, conv_id: Optional[str], history: List[Tuple[str, str]]
    ) -> Tuple[List[Tuple[str, str]], str]:
        """Load the selected conversation history"""
        if not conv_id:
            return [], "No conversation selected"
            
        messages = self.api.get_conversation(conv_id)
        history = [(msg["content"], next_msg["content"])
                  for msg, next_msg in zip(messages[::2], messages[1::2])]
        return history, f"Loaded conversation: {conv_id}"
    
    def create_interface(self) -> gr.Blocks:
        """Create the Gradio interface"""
        with gr.Blocks() as interface:
            with gr.Row():
                with gr.Column(scale=4):
                    chatbot = gr.Chatbot()
                    msg = gr.Textbox(
                        show_label=False,
                        placeholder="Enter message and press enter",
                    )
                with gr.Column(scale=1):
                    conv_dropdown = gr.Dropdown(
                        choices=self.conversations,
                        label="Select Conversation",
                    )
                    new_conv_btn = gr.Button("New Conversation")
                    delete_conv_btn = gr.Button("Delete Conversation")
                    status_text = gr.Textbox(label="Status", interactive=False)
            
            # Set up event handlers
            msg.submit(
                self.chat,
                [msg, chatbot, conv_dropdown],
                [chatbot, msg]
            )
            
            new_conv_btn.click(
                self.create_new_conversation,
                [],
                [conv_dropdown, status_text, chatbot]
            )
            
            delete_conv_btn.click(
                self.delete_current_conversation,
                [conv_dropdown],
                [conv_dropdown, status_text, chatbot]
            )
            
            conv_dropdown.change(
                self.load_conversation,
                [conv_dropdown, chatbot],
                [chatbot, status_text]
            )
            
        return interface

def main():
    chat_interface = ChatInterface()
    interface = chat_interface.create_interface()
    interface.launch(server_name="0.0.0.0", server_port=7860)

if __name__ == "__main__":
    main()