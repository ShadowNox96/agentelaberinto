#Importacion de las librerias

from flask import Flask, render_template, redirect, url_for, request, flash, make_response

#inicio de la aplicaion 
app = Flask(__name__)

app.secret_key= 'mysecret'

@app.route('/')
def indexPage():
    return render_template('index.html')

@app.route('/tabla', methods=['POST'])
def generaTabla():
    if request.method == 'POST':
        filas = int(request.form['filas'])
        columnas = int(request.form['columnas'])
        filas = range(filas)
        columnas = range(columnas)
    return render_template('tabla.html', columnas=columnas, filas= filas)



if __name__ == "__main__":
    app.run(debug=True)