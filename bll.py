import dal
import psycopg2


def register_user(username, password):
    sql_string = "INSERT INTO swuser (username, password) VALUES (%s, %s);"
    sql_variables = (username, password)
    try:
        dal.modify_table(sql_string, sql_variables)
    except psycopg2.IntegrityError:
        return -1
    else:
        sql_string = "SELECT ID FROM swuser WHERE username = %s;"
        sql_variable = (username, )
        user_id = dal.get_data_from_table(sql_string, sql_variable)[0][0]
        return user_id


def validate_user(username, password):
    sql_string = "SELECT ID FROM swuser WHERE username = %s AND password = %s;"
    sql_variables = (username, password)
    user_id = dal.get_data_from_table(sql_string, sql_variables)
    return user_id


def get_user_id(username):
    sql_string = "SELECT id FROM swuser WHERE username = %s;"
    sql_variable = (username, )
    return dal.get_data_from_table(sql_string, sql_variable)[0][0]


def insert_vote(planet_id, user_id, submission_time):
    sql_string = "INSERT INTO planet_votes (planet_id, user_id, submission_time) VALUES (%s, %s, %s);"
    sql_variables = (planet_id, user_id, submission_time)
    dal.modify_table(sql_string, sql_variables)
