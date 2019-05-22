---
id: in-app-authentication
title: In-app Authentication
---

## In-app Auth

In order to support payment via the InPlayer system, the native application should have an authentication functionality in place that authenticates a user in the InPlayer system. This can be implemented easily by using our register and login methods, provided in the native SDKs. These methods have the end-user successfully logged in/registered in the InPlayer system and return an authentication token to the application. Once these methods have the end-user authenticated, the application can offer them the payment options. 

The signUp method for iOS:

```swift
public static func signUp(
    fullName: String,
    email: String,
    password: String,
    passwordConfirmation: String,
    metadata: [String: Any]? = nil,
    success: @escaping (_ authorization: InPlayerAuthorization) -> Void,
    failure: @escaping (_ error: InPlayerError) -> Void
)
```

The authenticate method for iOS:

```swift
public static func authenticate(
    username: String,
    password: String,
    success: @escaping (_ authorization: InPlayerAuthorization) -> Void,
    failure: @escaping (_ error: InPlayerError) -> Void
)
```

 https://inplayer-org.github.io/inplayer-ios-sdk/Classes/InPlayer/Account.html#/s:11InPlayerSDK0aB0C7AccountC6signUp8fullName5email8password0J12Confirmation8metadata7success7failureySS_S3SSDySSypGSgyAA0aB13AuthorizationVcyAA0aB5Error_pctFZ 

The signUp method for Android:

```java
public void signUp(
    java.lang.String fullName,
    java.lang.String email,
    java.lang.String password,
    java.lang.String passwordConfirmation,
    InPlayerCallback<com.sdk.inplayer.model.account.InPlayerAuthorizationModel,com.sdk.inplayer.model.error.InPlayerException> callback
)
```

The authenticate method for Android:

```java
public void authenticate(
    java.lang.String username,
    java.lang.String password,
    InPlayerCallback<com.sdk.inplayer.model.account.InPlayerAuthorizationModel,com.sdk.inplayer.model.error.InPlayerException> callback
)
```

https://inplayer-org.github.io/inplayer-android-sdk/ 

## Social Auth

There is also the possibility of having your end-users authenticated via implementing the Social Auth feature which enables them to log in/register to your app by using their social platforms' accounts. Once they are authenticated, they can proceed to purchasing your in-app offer(s). 

## Social Auth Setup

To enable (or disable) the social logins of your choice, you need to click on their 'Setup' toggle buttons. Once they are enabled, you will find the social login buttons displayed on the Paywall. 

For further clarification regarding the Social Auth, please refer to the following article: https://inplayer.com/docs/settings/auth/#social-auth .

## SDK Methods for iOS

Our SDKs facilitate you to enable login via social platforms. In order to do so, take note of the example below.

Example

First, you should edit your plist file with your URL Scheme by adding the following lines:

Second, in the controller where you want to introduce the social login, you can call the method `getSocialUrls` with the same URL Scheme you have inserted in your plist file:

```java
InPlayer.Account.getSocialUrls(redirectUri: "app.inplayer://", success: { (socialUrls) in
}) { (error) in
}
```

The response returns a list of social login options that you can choose from (Facebook, Twitter, Google etc).

After clicking on one of them call the `socialLogin` method:

```java
InPlayer.Account.socialLogin(withUrl: url) { (account, error) in
}
```

This will open the social url in an external browser where you can log in with your credentials. After successful login, a pop-up will appear asking you whether you want to open your application. Responding with 'Yes' will take you back to your app where you will either get the account details or a possible error message.

To ensure everything mentioned above works, proceed to your AppDelegate to find the following method:

```java
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool
```

Then edit this method by inserting the following line of code:

```java
InPlayer.Account.validateSocialLogin(url: url)
```

This line will intercept the token after successful login.

## SDK Methods for Android

Example

First, you should edit your AndroidManifest.xml file with your URL Scheme by adding the following lines into your plist file:


Second, inside your Activity or Fragment, you should search for a list of all the available Social Urls. Once found, you should use the same URI Scheme you have configured in the previous step. To encourage best practices, we suggest that you use the package name. You can configure it on your own, but make sure it is a unique one. Beware not to forget placing the '://' at the end, though this suffix should not be included when defining the scheme in the manifest. This can be done with the following method:

```java
InPlayer.Account.getSocialLoginUrls(
        "social.inplayer://",
        InPlayerCallback { socialUrlsList, error ->
            if (error == null) {
                //Configure the list 
            } else {
                //Handle Error
            }
        })
```

The response returns a list of social login options that you can choose from (Facebook, Twitter, Google etc). Each of the social login options will consist of two string values - `socialAuthName` and `socialAuthUrl`.

After selecting the wanted `SocialLogin` method, open a web browser using `Intent.ACTION_VIEW`:

```java
startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(socialAuthUrl)))
```

As a result, taking this action will open the social url into an external browser where you can log in with your credentials. After successful login, you would be redirected to your app.

Lastly, to validate the received token, there is one last step to execute. In other words, you need to override the `onResume()` method inside the Manifest's Activity that you have already defined with the data scheme. The `Intent.data` should contain a URI for validation which should be sent to `InPlayer.Account.validateSocialLoginToken(uri,callback)` method like in the example below:

```java
override fun onResume() {
    super.onResume()
    intent.data?.let { uri ->
        InPlayer.Account.validateSocialLoginToken(uri, InPlayerCallback { user, error ->
            if (error == null) {
                //Successful authentication, continue to app
            } else {
                //Something went wrong when authenticating the user.
            }
        })
    }
}
```

Congratulations!
You have successfully authenticated using SocialUrls.
For a more detailed example, you can check the Example code inside `LoginActivity.kt`. 
