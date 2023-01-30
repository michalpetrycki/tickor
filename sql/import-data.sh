# for i in {1..50};
# do
#     /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P costam@711 -d master -i /tmp/sql/setup.sql
#     if [ $? -eq 0 ]
#     then
#         echo "setup.sql completed"
#         break
#     else
#         echo "not ready yet..."
#         sleep 10
#     fi
# done
#!/bin/bash
set -e

wait_time=20s 
password=costam@711

# wait for SQL Server to come up
echo importing data will start in $wait_time...
sleep $wait_time

echo running CreateLogins...
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $password -i /tmp/sql/setup.sql

exec "$@"