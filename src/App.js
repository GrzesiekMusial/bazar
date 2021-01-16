import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { FiShoppingBag as Bazar } from "react-icons/fi";
import { TiPinOutline as Board } from "react-icons/ti";
import {
    BiUserX as UserNotLogged,
    BiUserCheck as UserLogged,
} from "react-icons/bi";
import { CgAddR as AddNew } from "react-icons/cg";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductDetails from "./app/components/shop/productDetails";
import ProductCards from "./app/components/shop/productCards";
import BoardCards from "./app/components/board/boardCards";
import Test from "./app/components/other/home";
import AddProduct from "./app/components/shop/addProduct";
import AddBoard from "./app/components/board/addBoard";
import Header from "./app/components/common/header";
import Add from "./app/components/other/add";
import Buttons from "./app/components/common/buttons";
import Login from "./app/components/user/login";
import Register from "./app/components/user/register";
import ProtectedRoute from "./app/components/common/protectedRoute";

import * as auth from "./services/auth";
import * as imagesBase from "./services/images";

import { ImCheckboxChecked } from "react-icons/im";

class App extends Component {
    state = {
        images: null,
        photoIndex: 0,
        isOpen: false,
        header: null,
        buttons: null,
        user: null,
        load: false,
        check: false,
    };

    renderButtons = async () => {
        const userBtn = this.state.user ? <UserLogged /> : <UserNotLogged />;

        const buttons = [
            { name: <Board />, ref: "/board" },
            { name: <Bazar />, ref: "/bazar" },
            { name: <AddNew />, ref: "/add" },
            { name: userBtn, ref: "/login" },
        ];

        this.setState({ buttons: buttons });
    };

    renderTitle = (t) => {
        this.setState({ header: t });
    };

    renderImage = (img, index) => {
        this.setState({ images: img, photoIndex: index, isOpen: true });
    };

    renderUser = async () => {
        const resp = await auth.getUser();
        if (resp) this.setState({ user: resp });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.user !== this.state.user) {
            this.renderButtons();
        }
    }

    componentDidMount() {
        this.renderButtons();
        this.renderUser();
    }

    render(props) {
        const {
            isOpen,
            photoIndex,
            header,
            user,
            images,
            buttons,
        } = this.state;

        return (
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    transition={Flip}
                />

                <Header title={header} />
                {this.state.check && (
                    <div className="spinner check">
                        <ImCheckboxChecked />
                    </div>
                )}

                <Switch>
                    <ProtectedRoute
                        path="/bazar/add"
                        title={this.renderTitle}
                        component={AddProduct}
                    />

                    <Route
                        path="/add"
                        render={() => <Add title={this.renderTitle} />}
                    />

                    <ProtectedRoute
                        path="/board/edit/:id?"
                        title={this.renderTitle}
                        component={AddBoard}
                    />

                    <ProtectedRoute
                        path="/board/add"
                        title={this.renderTitle}
                        component={AddBoard}
                    />

                    <Route
                        path="/board/:id?"
                        render={(props) => (
                            <BoardCards
                                user={user}
                                title={this.renderTitle}
                                renderImage={this.renderImage}
                                {...props}
                            />
                        )}
                    />

                    <ProtectedRoute
                        path="/bazar/product/edit/:id?"
                        title={this.renderTitle}
                        component={AddProduct}
                    />

                    <Route
                        path="/bazar/product/:id?"
                        render={(props) => (
                            <ProductDetails
                                title={this.renderTitle}
                                renderImage={this.renderImage}
                                user={user}
                                {...props}
                            />
                        )}
                    />

                    <Route
                        path="/bazar/:id?"
                        render={(props, match, user) => (
                            <ProductCards title={this.renderTitle} {...props} />
                        )}
                    />

                    <Route
                        path="/login"
                        render={(props) => (
                            <Login
                                {...props}
                                title={this.renderTitle}
                                user={user}
                            />
                        )}
                    />

                    <Route
                        path="/register"
                        render={(props) => (
                            <Register {...props} title={this.renderTitle} />
                        )}
                    />

                    <Redirect to="/board" />
                </Switch>

                <Test />

                {buttons && <Buttons buttons={buttons} user={user} />}

                {isOpen && (
                    <Lightbox
                        mainSrc={imagesBase.get(images[photoIndex])}
                        nextSrc={imagesBase.get(
                            images[(photoIndex + 1) % images.length]
                        )}
                        prevSrc={imagesBase.get(
                            images[
                                (photoIndex + images.length - 1) % images.length
                            ]
                        )}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex:
                                    (photoIndex + images.length - 1) %
                                    images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default App;
