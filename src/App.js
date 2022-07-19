import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { RegisterReducer } from './reducer/register_reducer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import Login from './user_comps/Login'

import AppRegister from './register_comps/AppRegister'
import Category from './register_comps/Category';
import Nav from './Nav'
import About from './register_comps/about_me/About';

import AppAdmin from './admin_comps/AppAdmin';
import Registration_login from './register_comps/Registration_login';
import UserSingle from './user_comps/UserSingle';
import Likes from './Likes';
import LandingPage from './LandingPage';

import './style/css/nav.css'
import Footer from './Footer';
import Chat from './chat_comps/Chat';
import Support from './Support';
import Profile from './Profile';
import AboutUs from './AboutUs';
import Vip from './Vip';
import Discovery from './Discovery';
import TempTry from './TempTry';
import YouLike from './likes_comps/YouLike';
import LikesYou from './likes_comps/LikesYou';
import AppChatBox from './chatBox_comps/AppChatBox';
import ForgotPassword from './user_comps/ForgotPassword';
import NewPassword from './user_comps/NewPassword';


function App() {
  const myStore = createStore(RegisterReducer);





  // const scrollFunc = () => {
  //   console.log("scroll func");
  //   if (window.pageYOffset > 0) {
  //     document.getElementById("sticky-nav").classList.add("nav-sticky");
  //   }
  //   else {
  //     document.getElementById("sticky-nav").classList.remove("nav-sticky");
  //   }
  // }





  // useEffect(() => {
  //   console.log(window.pageYOffset);
  //   window.addEventListener("scroll", scrollFunc);

  // }, [])

  let flagFooter = false;
  let arrNav = ["/", "/home", "/login", "/register", "/support", "/about-us", "/registration_login", "/categories", "/about", "/temp", "/youlike", "/likesyou", "/messages", "/support", "/try", "/likes", "/my-profile", "/profile/:id", "/vip", "/discovery", "/chatbox", "/chatbox/:id", "/users/forgotPassword", "/newPassword"];


  for (let i = 0; i < arrNav.length; i++) {
    if (arrNav[i] === window.location.pathname) {
      flagFooter = true;
    }
  }





  return (
    <Provider store={myStore}>
      <div className="App">
        <Router>
          {/* <Nav /> */}
          <Switch>

            <Route exact path={["/home", "/temp", "/youlike", "/likesyou", "/messages", "/try", "/likes", "/my-profile", "/profile/:id", "/vip", "/discovery", "/chatbox", "/chatbox/:id"]} render={() => {
              return (
                <React.Fragment>
                  <Nav />
                </React.Fragment>
              )
            }
            } />

          </Switch>



          <Route exact path={'/'} component={LandingPage} />

          {/* <Route exact path={'/'} component={LandingPage} /> */}
          <Route path={'/register'} component={AppRegister}></Route>
          <Route exact path={'/home'} component={Home}></Route>
          <Route path={'/login'} component={Login}></Route>
          <Route path={'/registration_login'} component={Registration_login}></Route>
          <Route path={'/categories'} component={Category}></Route>
          <Route path={'/about'} component={About}></Route>

          {/* <Route path={'/temp'} component={TempTry} /> */}

          <Route path={'/youlike'} component={YouLike} />
          <Route path={'/likesyou'} component={LikesYou} />
          <Route path={'/chatbox'} component={AppChatBox}></Route>

          <Route path={'/messages'} component={Chat} />

          <Route path={'/support'} component={Support}></Route>


          {/* <Route path={'/try'} component={TryChat} /> */}

          <Route path={'/likes'} component={Likes} />

          <Route path={'/my-profile'} component={Profile} />

          <Route path={'/profile/:id'} component={UserSingle}></Route>

          <Route path={'/about-us'} component={AboutUs}></Route>

          <Route path={'/vip'} component={Vip}></Route>

          <Route path={'/discovery'} component={Discovery}></Route>
          <Route path={'/users/forgotPassword'} component={ForgotPassword}></Route>
          <Route path={'/newPassword'} component={NewPassword}></Route>

          <Route path={'/admin'} component={AppAdmin} />

          {/* <Route path={'/vip/*'} exact={true} component={TempTry} /> */}





          {/* 
          {flagFooter ?
            <Footer />
            : ''
          } */}
          {/* <Footer /> */}

          {/* <Footer /> */}


        </Router>



      </div>
    </Provider>
  );
}

export default App;