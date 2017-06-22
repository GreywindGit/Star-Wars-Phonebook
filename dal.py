import psycopg2
from credentials import connection_data


def establish_connection():
    try:
        connect_str = "dbname={} user={} host={} password={}".format(connection_data['dbname'],
                                                                     connection_data['user'],
                                                                     connection_data['host'],
                                                                     connection_data['password'])
        conn = psycopg2.connect(connect_str)
        conn.autocommit = True
    except psycopg2.DatabaseError as e:
        print("Cannot connect to database.")
        print(e)
    else:
        return conn


def get_data_from_table(sql_string, sql_variables=None):
    conn = establish_connection()
    cursor = conn.cursor()
    cursor.execute(sql_string, sql_variables)
    result_set = cursor.fetchall()
    cursor.close()
    conn.close()
    return result_set


def modify_table(sql_string, sql_variables=None):
    conn = establish_connection()
    cursor = conn.cursor()
    cursor.execute(sql_string, sql_variables)
    cursor.close()
    conn.close()
