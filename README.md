
1) ###### /emailService ######

Allowed HTTPs requests:

    1) POST

Description Of Usual Server Responses:

    1) 200 OK - the request was successful

Request Body attributes :

    1) to  - string representing receivers email ID
    2) subject -  string representing  subject of email
    3) text -  string representing  body of email
# How we have solved it #
> For handling single API request we have diffrent middlewares
> each middleware responsible to send mail using diffrent Email Provider.
> if one of the service goes down or unable to send mail then request is passed to next email service provider.
> if NONE of the email service provider is able to send mail we are  in failure stage and we request user to try after sometime.
