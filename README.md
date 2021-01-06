#Deployment:
1. CD into the exif-stripper folder
2. 'npm install' to install all the dependencies
3. Run 'npm run build' to build the project. The project should have created the build folder with the production-ready app in it.
4. CD into the exif-backend folder and run 'npm start' - The backend server will run on port 4000.
  * The backend server expects the "build" folder to be one folder up the hierarchy. Example: backend is in exif/backend/ then it looks for the React build folder in exif/build/
  
#Configuration
##Backend
config/database.json - Use this file to configure the connection to the mongodb. By default, localhost:27017 and the collection "exif" are used.
