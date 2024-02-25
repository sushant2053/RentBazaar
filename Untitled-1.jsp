<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="java.net.HttpURLConnection, java.net.URL, java.io.BufferedReader, java.io.InputStreamReader" %>
<%@ page import="org.apache.log4j.*" %>

<html>
<head>
    <title>API Call</title>
</head>
<body>
    <h2>API Response:</h2>
    <pre>
        <%
            try {
                // API endpoint URL
                String apiUrl = "http://ip-api.com/json/";
                
                Logger logger = LogManager.getLogger("mylog");
                logger.info("API calling for the url: " + apiUrl);

                // Create a URL object
                URL url = new URL(apiUrl);

                // Open a connection to the URL
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();

                // Set request method
                connection.setRequestMethod("GET");

                // Set request headers if necessary
                // e.g., for authentication or content type
                // connection.setRequestProperty("key", "value");

                // Get the response code
                int responseCode = connection.getResponseCode();
                logger.info("api connection response code: " + responseCode);

                // If the response code is 200 (HTTP_OK), read the response
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String inputLine;
                    StringBuffer myresponse = new StringBuffer();

                    // Read the response line by line
                    while ((inputLine = in.readLine()) != null) {
                    	myresponse.append(inputLine);
                    }
                    logger.info("Response: " + myresponse);
                    in.close();

                    // Output the response
                    out.println(myresponse.toString());
                } else {
                    // Handle error cases, like API responding with an error code
                    out.println("Error: Unable to connect to API. Response Code: " + responseCode);
                }
            } catch (Exception e) {
                // Handle exceptions, such as IOException or MalformedURLException
                out.println("Error: " + e.getMessage());
                e.printStackTrace();
            }
        %>
    </pre>
</body>
</html>
