if [ -f "$DB_FILE" ]; then
    rm $DB_FILE
fi

python3 manage.py migrate
python3 manage.py runserver