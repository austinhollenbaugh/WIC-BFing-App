select * from messages
where room_id = $1
ORDER BY date_time;
