echo Testing GET /api/geotags
curlie http://localhost:3000/api/geotags
curlie http://localhost:3000/api/geotags?searchTerm=edu
curlie http://localhost:3000/api/geotags?searchTerm=edu&latitude=49.0163498971946&longitude=8.390911128469323

echo Testing GET /api/geotags/:id
curlie http://localhost:3000/api/geotags/1
curlie http://localhost:3000/api/geotags/11111

echo Testing POST /api/geotags
curlie -X POST http://localhost:3000/api/geotags -d @invalid.json
curlie -X POST http://localhost:3000/api/geotags -d @valid.json

echo Testing PUT /api/geotags
curlie -X PUT http://localhost:3000/api/geotags/1 -d @invalid.json
curlie -X PUT http://localhost:3000/api/geotags/1 -d @valid.json

echo Testing DELETE /api/geotags/:id
curlie -X DELETE http://localhost:3000/api/geotags/1
curlie -X DELETE http://localhost:3000/api/geotags/111111