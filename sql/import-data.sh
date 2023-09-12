#!/bin/bash
set -e

wait_time=60s 
password=costam@711

# wait for SQL Server to come up
echo importing data will start in $wait_time...
sleep $wait_time

echo running data init file...
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $password -i /tmp/sql/create_database.sql
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $password -i /tmp/sql/seed_database.sql
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $password -i /tmp/sql/create_test_database.sql

exec "$@"