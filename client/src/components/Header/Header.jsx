import bg from "../../assets/headerbg.png";
import "./header.css";

const Header = () => {
  return (
    <header className="header df aic jcc">
      <div className="header-left df aic">
        <h1>
          There is food for everyone on this planet,
          <br /> but not everyone eats.
        </h1>
      </div>
      <div className="header-right df aic jcc">
        <img className="header-bg" src={bg} alt="" />
      </div>
    </header>
  );
};

export default Header;
