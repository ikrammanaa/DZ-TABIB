import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

class MySQLHelper:
    def __init__(self):
        # Initialize connection parameters
        self.connection = None
        self.cursor = None
        try:
            self.connection = mysql.connector.connect(
                host=os.getenv("DB_HOST"),  # Use environment variables
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                database=os.getenv("DB_NAME")
            )
            self.cursor = self.connection.cursor(dictionary=True)  # Use dictionary=True for JSON serialization
        except Error as e:
            print(f"Error connecting to MySQL: {e}")

    def execute_query(self, query, params=None):
        """
        Executes a SELECT query and returns results.
        """
        try:
            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except Error as e:
            print(f"Error executing query: {e}")
            return []

    def execute_update(self, query, params=None):
        """
        Executes an INSERT, UPDATE, or DELETE query.
        """
        try:
            self.cursor.execute(query, params)
            self.connection.commit()
        except Error as e:
            print(f"Error executing update: {e}")
            self.connection.rollback()

    def close(self):
        """
        Closes the database connection.
        """
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

