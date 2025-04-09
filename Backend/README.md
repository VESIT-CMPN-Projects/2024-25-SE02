Add a .env file and add PORT and MONGO_URI in it

| **Endpoint**               | **Method** | **Description**                                     | **Request Body** (if applicable)                                      |
|---------------------------|------------|--------------------------------------------------|----------------------------------------------------------------|
| `/user/signup`           | POST       | Register a new user                              | `{ "name": "string", "email": "string", "password": "string" }` |
| `/user/login`            | POST       | Login a user                                    | `{ "email": "string", "password": "string" }`                   |
| `/ride/`                 | GET        | Get all rides                                  | -                                                                |
| `/ride/add`              | POST       | Add a new ride                                 | `{ "ride_name": "string", "start_location": "string", "end_location": "string", "date_time": "Date", "distance": "number", "organizer_id": "ObjectId" }` |
| `/ride/:id`              | GET        | Get ride by ID                                 | -                                                                |
| `/ride/:id`              | PUT        | Update ride details                           | `{ "ride_name": "string", "start_location": "string", "end_location": "string", "date_time": "Date", "distance": "number" }` |
| `/ride/:id`              | DELETE     | Delete a ride                                 | -                                                                |
| `/registration/`         | GET        | Get all registrations                         | -                                                                |
| `/registration/:id`      | GET        | Get registration by ID                        | -                                                                |
| `/registration/`         | POST       | Register for a ride                           | `{ "user_id": "ObjectId", "ride_id": "ObjectId" }`               |
| `/registration/:id/status` | PUT      | Update registration status                    | `{ "status": "Pending" | "Confirmed" | "Cancelled" }`             |
| `/registration/:id`      | DELETE     | Delete a registration                         | -                                                                |
| `/order/`                | GET        | Get all orders                                | -                                                                |
| `/order/:id`             | GET        | Get order by ID                               | -                                                                |
| `/order/`                | POST       | Place a new order                             | `{ "user_id": "ObjectId", "item_id": "ObjectId", "quantity": "number", "total_price": "number" }` |
| `/order/:id`             | PUT        | Update an existing order                      | `{ "quantity": "number", "total_price": "number" }`              |
| `/order/:id`             | DELETE     | Delete an order                               | -                                                                |
| `/merchandise/`          | GET        | Get all merchandise items                     | -                                                                |
| `/merchandise/:id`       | GET        | Get merchandise item by ID                    | -                                                                |
| `/merchandise/`          | POST       | Add new merchandise item                      | `{ "item_name": "string", "item_type": "string", "price": "number", "stock": "number", "description": "string" }` |
| `/merchandise/:id`       | PUT        | Update merchandise item                       | `{ "item_name": "string", "item_type": "string", "price": "number", "stock": "number", "description": "string" }` |
| `/merchandise/:id`       | DELETE     | Delete merchandise item                       | -                                                                |
| `/feedback/`             | GET        | Get all feedback                              | -                                                                |
| `/feedback/:id`          | GET        | Get feedback by ID                            | -                                                                |
| `/feedback/`             | POST       | Submit new feedback                           | `{ "user_id": "ObjectId", "ride_id": "ObjectId", "rating": "number", "comments": "string" }` |
| `/feedback/:id`          | PUT        | Update feedback                               | `{ "rating": "number", "comments": "string" }`                   |
| `/feedback/:id`          | DELETE     | Delete feedback                               | -                                                                |
| `/emergency/`            | GET        | Get all emergency alerts                      | -                                                                |
| `/emergency/:id`         | GET        | Get emergency alert by ID                     | -                                                                |
| `/emergency/`            | POST       | Report an emergency                           | `{ "user_id": "ObjectId", "ride_id": "ObjectId", "location": "string" }` |
| `/emergency/:id`         | PUT        | Update emergency status                       | `{ "status": "Active" | "Resolved" }`                             |
| `/emergency/:id`         | DELETE     | Delete an emergency alert                     | -                                                                |
| `/donation/`             | GET        | Get all donations                             | -                                                                |
| `/donation/:id`          | GET        | Get donation by ID                            | -                                                                |
| `/donation/`             | POST       | Add a new donation                            | `{ "user_id": "ObjectId", "amount": "number", "payment_method": "string" }` |
| `/donation/:id`          | DELETE     | Delete a donation                             | -                                                                |

