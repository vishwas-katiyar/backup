from flask import Flask, jsonify,request
from flask_cors import CORS ,cross_origin
import urllib.parse , json
# from itsdangerous import json
import pandas as pd
# from  
from sqlalchemy import insert

# stmt = (
#     insert(user_table).
#     values(name='username', fullname='Full Username')
# )
# query = 'Hellö Wörld@Python'
# print()

from sqlalchemy import create_engine
  
# DEFINE THE DATABASE CREDENTIALS
user = 'root'
password = r'''Password@123'''
host = '127.0.0.1'
port = 3306
database = 'RWSDB'
  
# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT
def get_connection():
    return create_engine(
        url="mysql+pymysql://"+user+":"+urllib.parse.quote(password)+"@"+host+":"+str(port)+"/"+database
    )
engine = get_connection()


app = Flask(__name__)

CORS(app, support_credentials=True)


import os
from functools import wraps
import jwt
from flask import request, abort
# from flask import app

SECRET_KEY = os.environ.get('SECRET_KEY') or 'HelloSecretKey'
print(SECRET_KEY)
app.config['SECRET_KEY'] = SECRET_KEY




def response_util(data, status_code):
    return app.response_class(response=json.dumps(data),
                              status=status_code,
                              mimetype='application/json')


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # try:
        if "Authorization" in request.headers:
            try:
                token = request.headers["Authorization"].split(" ")[1]
            except : pass
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data=jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            query = r'''SELECT email, password
                        FROM AdminData
                        WHERE email = '{}'
                        AND
                        password = '{}'
                        '''
            current_user=engine.execute(query)
            print(current_user)
            if current_user is None:
                return {
                "message": "Invalid Authentication token!",
                "data": None,
                "error": "Unauthorized"
            }, 401
            # if not current_user["active"]:
            #     abort(403)
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    # unset_jwt_cookies(response)
    return response

# @cross_origin
@app.route("/dashboard", methods=["GET", "POST"])
@token_required
def dashboard(func):
    # data = request.form
    # print(data)
    try:
    # if True:
        query = r'''SELECT * FROM RWS_Table LIMIT 100 ;
        '''
        a=pd.read_sql_query(query,engine)
        a['full_name']=a['name_prefix']+' '+a['name_first']+' '+ a['name_middle']+' '+a['name_last']
        count=pd.read_sql_query('''SELECT COUNT(*) FROM RWS_Table ;''',engine)

        print(count['COUNT(*)'])
        return {'msg':'success','count':count['COUNT(*)'].T.to_json(),'data':a.T.to_json()}
    except Exception as e:
        print(e)
        return ({'msg':'something bad occured'},400)

# @cross_origin
@app.route("/getEmployee", methods=["GET", "POST"])
@token_required
def getEmployee(func):
    data = request.get_json()
    print(data)
    try:
    # if True:
        query = r'''SELECT * FROM RWS_Table WHERE `id` = '{}' ;    '''
        # query1 = r'''SELECT * FROM RWS_Table LIMIT 2 ;    '''
        a=pd.read_sql_query(query.format(data['emp_id']),engine)
        # a1=pd.read_sql_query(query1,engine)
        # a['full_name']=a['name_prefix']+' '+a['name_first']+' '+ a['name_middle']+' '+a['name_last']
        # count=pd.read_sql_query('''SELECT COUNT(*) FROM RWS_Table ;''',engine)

        print(a)
        # print(a1)
        return {'msg':'success','data':a.T[0].to_json()}
    except Exception as e:
        print(e)
        return ({'msg':'something bad occured'},400)


# @cross_origin
@app.route("/login", methods=["GET", "POST"])
def login():
    data = request.form
    print(data)         
    try:
        query = r'''SELECT email, password
        FROM AdminData
        WHERE email = '{}'
        AND
        password = '{}'
        '''
        # print('herere')
        user=pd.read_sql_query(query.format(data['email'],data['password']),engine)
        # print('herere1111/1')
        # print(user)

        # print('ffff',user.iloc[0])
        if len(user) == 1 :
            user=user.iloc[0].to_dict()
            try:
                print('token Created')
                # token should expire after 24 hrs
                user["token"] = jwt.encode(
                    {"user_id": 'Logged_in'},
                    app.config["SECRET_KEY"],
                    algorithm="HS256"
                )
                print('token Created',user)
                
                return response_util({'msg': 'Successfully fetched auth token','success':True,'data':user}, 200) 
                
            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
            # return ({'msg':'User Logged in '},200)
        else:
            # wrong
            return ({'msg':'Incorrect Id Password.... '},401)
    except Exception as e:
        print(e)
        return ({'msg':'something bad occured'},400)

# @cross_origin
@app.route("/onUpdate", methods=["GET", "POST"])
def onUpdate():
    data = request.form
    # print(data)         
    # try:
    if True:
        # return {'msg': 'success'}
        query = r'''
        UPDATE RWS_Table
        SET {}
        WHERE id = '{}'; 
        '''
        querydata=''
        # ContactName = 'Alfred Schmidt', City= 'Frankfurt'
        for key , value in data.items():
            # print(key , value)
            querydata+=key +" = '"+value+"' ,"
        
        querydata=querydata[:-1]

        print(query.format(querydata,data['id']))
        engine.execute(query.format(querydata,data['id']))
        
        # a=pd.read_sql_query(query.format(data['email'],data['password']),engine)
        # print(a)
        # if len(a) == 1 :
            # return {'msg':'User Logged in '}
        # else:
            # wrong
        return {'msg':'Incorrect Id Password.... '}
    # except Exception as e:
    #     print(e)
    #     return ({'msg':'something bad occured'},400)
    return True



@app.route("/SignUp", methods=["POST"])
# @login_required
def SignUp():
    data = request.form
    print(data)
    try:
        engine.execute('INSERT INTO AdminData '
               '(email, password) '
               'VALUES ("{0}","{1}");'.format(data['email'],data['password']))
    # print(stmt)
        return {'msg':'user created'}
    except Exception as e:
        print(e)
        return {'msg':'user already '}

if __name__ == '__main__':
    app.run(port='5000',debug=True)
