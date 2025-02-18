
import appIcon from '../assets/appIcon.png'
import profileIcon from '../assets/profile.png'


const Header: React.FC = () => {
  return (
    <div className="w-full h-14 px-5 bg-white flex justify-between items-center fixed border-bottom z-10">
      <img
        src={appIcon}
        alt="app-icon"
        className="h-8"
      />
      <img
        src={profileIcon}
        alt="profile-icon"
        className="h-7"
      />
    </div>
  );
};

export default Header;
