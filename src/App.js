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
import Spinner from "./app/components/common/spinner";

import * as auth from "./services/auth";
import * as imagesBase from "./services/images";
import { apiClient } from "./services/client";

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

    renderUser = () => {
        const resp = auth.getUser();
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
        const { isOpen, photoIndex } = this.state;

        return (
            <div>
                <Header title={this.state.header} />
                {this.state.load === true && <Spinner />}
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
                        path="/board"
                        render={(props) => (
                            <BoardCards
                                user={this.state.user}
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
                                user={this.state.user}
                                {...props}
                            />
                        )}
                    />

                    <Route
                        path="/bazar/:category?/:text?"
                        render={(props, match) => (
                            <ProductCards title={this.renderTitle} {...props} />
                        )}
                    />

                    <Route
                        path="/login"
                        user={this.state.user}
                        render={(props) => (
                            <Login
                                {...props}
                                title={this.renderTitle}
                                user={this.state.user}
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

                {this.state.buttons && (
                    <Buttons
                        buttons={this.state.buttons}
                        user={this.state.user}
                    />
                )}

                {isOpen && (
                    <Lightbox
                        mainSrc={imagesBase.get(this.state.images[photoIndex])}
                        nextSrc={imagesBase.get(
                            this.state.images[
                                (photoIndex + 1) % this.state.images.length
                            ]
                        )}
                        prevSrc={imagesBase.get(
                            this.state.images[
                                (photoIndex + this.state.images.length - 1) %
                                    this.state.images.length
                            ]
                        )}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex:
                                    (photoIndex +
                                        this.state.images.length -
                                        1) %
                                    this.state.images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex:
                                    (photoIndex + 1) % this.state.images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default App;
