import React, { Component, useEffect } from "react";
import ProductDetails from "./app/components/productDetails";
import ProductCards from "./app/components/productCards";
import BoardCards from "./app/components/boardCards";
import Test from "./app/components/home";
import AddProduct from "./app/components/addProduct";
// import AddProduct from "./app/components/addProductt";
import AddBoard from "./app/components/addBoard";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./app/components/common/header";
import Add from "./app/components/add";
import Buttons from "./app/components/common/buttons";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { FiShoppingBag as Bazar } from "react-icons/fi";
import { TiPinOutline as Board } from "react-icons/ti";
import { GrBookmark as Priv } from "react-icons/gr";
import { BiUser as User } from "react-icons/bi";
import { CgAddR as AddNew } from "react-icons/cg";
import PaginationDynamicBullet from "./app/components/home";

class App extends Component {
    state = {
        images: null,
        photoIndex: 0,
        isOpen: false,
        header: null,

        buttons: [
            { name: <Board />, ref: "/board" },
            { name: <Bazar />, ref: "/bazar" },
            { name: <AddNew />, ref: "/add" },
            { name: <User />, ref: "/bazar" },
        ],
    };

    renderButtons = (b) => {
        this.setState({ buttons: b });
    };

    renderTitle = (t) => {
        console.log(t);
        this.setState({ header: t });
    };

    addProduct = (p) => {
        const newData = this.state.data;
        p.id = newData.length;
        newData.push(p);
        this.setState({ data: newData });
    };

    renderImage = (img, index) => {
        console.log(img, index);
        this.setState({ images: img, photoIndex: index, isOpen: true });
    };

    render() {
        const { isOpen, photoIndex } = this.state;

        return (
            <div>
                <Header title={this.state.header} />
                <Switch>
                    <Route
                        path="/add"
                        render={(props) => (
                            <Add
                                add={this.addProduct}
                                title={this.renderTitle}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/bazar/add"
                        render={(props) => (
                            <AddProduct
                                add={this.addProduct}
                                title={this.renderTitle}
                                {...props}
                            />
                        )}
                    />

                    <Route
                        path="/board/add"
                        render={(props) => (
                            <AddBoard title={this.renderTitle} {...props} />
                        )}
                    />

                    <Route
                        path="/board"
                        render={(props) => (
                            <BoardCards
                                title={this.renderTitle}
                                renderImage={this.renderImage}
                                {...props}
                            />
                        )}
                    />

                    <Route
                        path="/bazar/product/:id?"
                        render={(props) => (
                            <ProductDetails
                                title={this.renderTitle}
                                renderImage={this.renderImage}
                                {...props}
                            />
                        )}
                    />

                    <Route
                        path="/bazar/:category?/:text?"
                        render={(props, match) => (
                            <ProductCards
                                title={this.renderTitle}
                                {...props}
                                {...match}
                            />
                        )}
                    />

                    {/* <Route path="/bazar" component={ProductCards} /> */}
                    {/* <Route path="/board" component={BoardCards} /> */}
                    {/* <Route path="/board/new" component={AddBoard} /> */}
                    {/* <Route path="/not-found" component={NotFound} /> */}
                    {/* <Redirect to="/not-found" /> */}
                </Switch>

                <Test />
                <Buttons buttons={this.state.buttons} />

                {isOpen && (
                    <Lightbox
                        mainSrc={this.state.images[photoIndex]}
                        nextSrc={
                            this.state.images[
                                (photoIndex + 1) % this.state.images.length
                            ]
                        }
                        prevSrc={
                            this.state.images[
                                (photoIndex + this.state.images.length - 1) %
                                    this.state.images.length
                            ]
                        }
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
