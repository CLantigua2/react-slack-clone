import HomePage from "../pages/home-page";
import Login from "../pages/login-page";
import Register from "../pages/register-page";
import SlackPage from "../pages/slack-page";
import WithSpinner from "../common/with-spinner";

export const HomePageWithSpinner = WithSpinner(HomePage);
export const LoginWithSpinner = WithSpinner(Login);
export const RegisterWithSpinner = WithSpinner(Register);
export const SlackPageWithSpinner = WithSpinner(SlackPage);
