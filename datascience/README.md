# WS24-MyDailyImpact - Data Science

## Overview
This folder contains the data science features of our project:
 - Impact Calculation (Score)
 - ML Model: Carbon Emission Forecast
 - ML Model: Churn Prediction

The features are coded in Python and not integrated into the rest of the app due to limitations in time and experience.

## Virtual Environment
Please make sure you have forked the repo, clone it on your computer, and then set up a new virtual environment.
Python 3.11.3 is recommended here, but another compatible Python version can also be used.

The added __requirements.txt__ contains all libraries and dependencies we need to execute the code. 

### **`macOS`** type the following commands: 

- Install the virtual environment and the required packages by following commands:

    ```BASH
    pyenv local 3.11.3
    python -m venv .venv
    source .venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    ```
### **`WindowsOS`** type the following commands:

- Install the virtual environment and the required packages by following commands.

    For `Git-Bash` CLI :
  
    ```Bash
    pyenv local 3.11.3
    python -m venv .venv
    source .venv/Scripts/activate
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    ```
## Features
 ### Impact Calculation
 The impact per category per meal is calculated based on open-source data from statistic bureaus and research papers. All the data used in the code can be found in the data folder.
 The files 'score**.py' refers to these csv and xlsx files and make the calculation for corresponding categories. Refer to the comments in the codes for assumptions and methods used for the calculation.
 
 ### ML Model: Carbon Emission Forecast
 The code for this machine learning model is saved in 'Carbonprediction.ipynb'. The analysis is based on the synthetic user data created by the 'synthetic_activity_record_data_gen.py'. The Jupyter Notebook also includes data visualization for the user data. 
 
 ### ML Model: Churn Prediction
 The code for this machine learning model is saved in 'Churn_prediction.ipynb'. The analysis is based on the synthetic user data created by the 'synthetic_activity_record_data_gen.py'.


## Project Structure
The datascien-folder is organized into several directories:
``` 
datascience/

├── images/                                      # images used for the blogpost
├── impact_calc/                                 # all components for impact calculation
│   ├── data/                                    # data used for impact calculation
│   ├── score_animals_lives.py                   # calculation for animal lives saved per meal
│   ├── score_co2_land_water.py                  # calculation for co2 and land saved per meal
│   ├── score_water.py                           # calculation for water saved per meal
├── machine_learning/                            # all components for ML models and visualization
│   ├── archive/                                 # codes for alternative synthetic user data
│   ├── data/                                    # synthetic user data generated 
│   ├── Carbon_Prediction.ipynb                  # Notebook for carbon prdiction
│   ├── Churn_prediction.ipynb                   # Notebook for churn prediction
│   └── synthetic_activity_record_data_gen.py    # synthetic user data generation
├── requirement.md                               # virtual environment reqirement
└── README.md                                    # Technical documentation of DS team 


```


## Team Members
- Vanessa Turker
- Anna von Bank
- Menglan Liu
- Zubin John (mentor)
- Rashmi Carol Dsouza (mentor)
