from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/csv', methods=['GET'])
def get_csv():
    try:
        arquivo_csv = os.path.join(os.path.dirname(__file__), 'alertas.csv')
        
        if not os.path.exists(arquivo_csv):
            return jsonify({'erro': 'Arquivo CSV não encontrado'}), 404
        
        df = pd.read_csv(arquivo_csv)
        dados = df.to_dict('records')
        
        return jsonify(dados)
        
    except Exception as e:
        return jsonify({'erro': f'Erro: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)