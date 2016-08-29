SELECT * FROM conversations
JOIN messages
ON conversations.room_id = messages.room_id
WHERE messages.user_id = $1;
