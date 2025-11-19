from pathlib import Path
import pandas as pd
import joblib
import os


def merge_input(frontend_data: dict):
    key_map = {
        "Gender": "Gender",
        "Age": "Age",
        "Height": "Height",
        "Weight": "Weight",
        "family_history_with_overweight": "family_history_with_overweight",
        "FAVC": "FAVC",
        "FCVC": "FCVC",
        "NCP": "NCP",
        "CAEC": "CAEC",
        "SMOKE": "SMOKE",
        "CH2O": "CH2O",
        "SCC": "SCC",
        "FAF": "FAF",
        "TUE": "TUE",
        "CALC": "CALC",
        "MTRANS": "MTRANS",
    }

    numeric_keys = {
        "Age", "Height", "Weight", "FCVC", "FAF",
        "FAVC", "NCP", "TUE", "CH2O", "SCC",
        "SMOKE", "family_history_with_overweight"
    }

    merged = {}

    for key, value in frontend_data.items():
        if key in key_map:
            new_key = key_map[key]

            # convert angka
            if key in numeric_keys:
                if isinstance(value, str) and "." in value:
                    merged[new_key] = float(value)
                else:
                    merged[new_key] = int(value)
            else:
                merged[new_key] = value

    return merged


def predict_obesity(user_input):
    """
    Predict obesity level from user health and lifestyle data.

    Parameters:
    -----------
    user_input : dict
        Dictionary containing user's health and lifestyle information.
        Required keys:
        - Gender: 'Male' or 'Female'
        - Age: numeric (years)
        - Height: numeric (meters, e.g., 1.75)
        - Weight: numeric (kg)
        - family_history_with_overweight: 0 or 1
        - FAVC: 0 or 1 (Frequent high caloric food consumption)
        - FCVC: numeric (Vegetable consumption frequency)
        - NCP: numeric (Number of main meals)
        - CAEC: 'no', 'Sometimes', 'Frequently', 'Always' (Snacking)
        - SMOKE: 0 or 1
        - CH2O: numeric (Daily water consumption in liters)
        - SCC: 0 or 1 (Calorie monitoring)
        - FAF: numeric (Physical activity frequency, 0-3)
        - TUE: numeric (Technology usage time)
        - CALC: '0', 'Sometimes', 'Frequently' (Alcohol)
        - MTRANS: 'Automobile', 'Bike', 'Motorbike', 
                  'Public_Transportation', 'Walking'

    Returns:
    --------
    dict: {
        'prediction': str - Predicted obesity level
        'confidence': float - Confidence percentage
        'probabilities': dict - All class probabilities
    }
    """

    current_path = Path(__file__).resolve().parent.parent
    
    print("Loading model package from:", current_path)
    model_package = joblib.load(
        f"{current_path}/model/obesity_model_complete.joblib")
    
    
    model = model_package['model']
    encoders = model_package['encoders']
    feature_names = model_package['feature_names']
    target_col = model_package['target_col']

    # Convert input to DataFrame
    normalized_input = merge_input(user_input)
    input_df = pd.DataFrame([normalized_input])

    # --- STEP 1: Encode categorical variables ---
    for col in input_df.columns:
        if col in encoders and col != target_col:
            try:
                input_df[col] = encoders[col].transform(input_df[col])
            except ValueError as e:
                print(f"❌ Error encoding '{col}': {e}")
                print(f"   Valid values: {list(encoders[col].classes_)}")
                return {
                    'prediction': None,
                    'confidence': None,
                    'probabilities': None,
                    'error': f"Invalid value for {col}"
                }

    # --- STEP 2: Feature Engineering (same as training) ---
    input_df['BMI'] = input_df['Weight'] / (input_df['Height'] ** 2)

    # Age Group categorization
    age_val = input_df['Age'].values[0]
    if age_val <= 18:
        input_df['Age_Group'] = 0
    elif age_val <= 30:
        input_df['Age_Group'] = 1
    elif age_val <= 40:
        input_df['Age_Group'] = 2
    elif age_val <= 50:
        input_df['Age_Group'] = 3
    else:
        input_df['Age_Group'] = 4

    # Additional engineered features
    input_df['Weight_Height_Ratio'] = input_df['Weight'] / input_df['Height']
    input_df['Activity_Water_Ratio'] = input_df['FAF'] / (input_df['CH2O'] + 1)
    input_df['Unhealthy_Lifestyle'] = (
        input_df['FAVC'] +
        input_df['SMOKE'] +
        (3 - input_df['FAF'])
    ) / 3

    # Ensure correct feature order
    input_df = input_df[feature_names]

    # --- STEP 3: Make Prediction ---
    prediction_encoded = model.predict(input_df)[0]
    prediction = encoders[target_col].inverse_transform([prediction_encoded])[
        0]

    # Get probabilities for all classes
    prediction_proba = model.predict_proba(input_df)[0]
    confidence = max(prediction_proba) * 100

    # Create probability dictionary
    prob_dict = {
        label: round(prob * 100, 2)
        for label, prob in zip(encoders[target_col].classes_, prediction_proba)
    }
    prob_dict = dict(
        sorted(prob_dict.items(), key=lambda x: x[1], reverse=True))
    
    bmi_data = input_df['BMI'].values[0]
    return {
        'prediction': prediction,
        'confidence': round(confidence, 2),
        'probabilities': prob_dict,
        "bmi": bmi_data
    }


def print_prediction(result):
    """Pretty print the prediction result."""
    if result.get('error'):
        print(f"\n❌ Error: {result['error']}")
        return

    print(f"\n{'='*70}")
    print(f"{'🎯 PREDICTION RESULT':^70}")
    print(f"{'='*70}")
    print(f"Predicted Obesity Level: {result['prediction']}")
    print(f"Confidence: {result['confidence']:.2f}%")
    print(f"\n{'All Class Probabilities:':<70}")
    print(f"{'-'*70}")
    for label, prob in result['probabilities'].items():
        bar_length = int(prob / 2)
        bar = "█" * bar_length
        print(f"{label:30s}: {prob:6.2f}% {bar}")
    print(f"{'='*70}\n")


# ============================================================================
# EXAMPLE USAGE
# ============================================================================

if __name__ == "__main__":
    print("🏥 Obesity Level Prediction System (Single Model Version)")
    print("=" * 70)

    # Example 1: Healthy person
    user_data = {
        'Gender': 'Male',
        'Age': 25,
        'Height': 1.75,
        'Weight': 70,
        'family_history_with_overweight': 0,
        'FAVC': 0,
        'FCVC': 3,
        'NCP': 3,
        'CAEC': 'Sometimes',
        'SMOKE': 0,
        'CH2O': 2,
        'SCC': 1,
        'FAF': 2,
        'TUE': 1,
        'CALC': '0',
        'MTRANS': 'Walking'
    }

    print("\n📋 Example: Healthy Young Male")
    print("-" * 70)
    result = predict_obesity(user_data)
    print_prediction(result)

    # Example 2: Access results programmatically
    print("\n📊 Programmatic Access:")
    print(f"Prediction: {result['prediction']}")
    print(f"Confidence: {result['confidence']}%")
    print("Top 3 probabilities:")
    for i, (label, prob) in enumerate(list(result['probabilities'].items())[:3], 1):
        print(f"  {i}. {label}: {prob}%")
