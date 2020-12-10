const Header = ({ title }) => {
    console.log(title);
    if (!title) return null;
    return <header className="screen__header">{title}</header>;
};

export default Header;
