import { logoPath, pathItemMap, Dropdown } from '../../../shared';
import '../ui/NavigationBarStyle.css';
import { RootState } from '../../../shared';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../features';
import { useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };

    const dropdownOptions = [
        {
            label: '마이페이지',
            action: () => navigate(pathItemMap['myPage'].path),
        },
        {
            label: 'Settings',
            action: () => console.log('Settings'),
        },
        {
            label: 'Logout',
            action: handleLogout,
        },
    ];

    // 유저명 길이 제한
    const formatUserName = (name: string) => {
        const maxLength = 4; // 최대 길이
        return name.length > maxLength
            ? `${name.slice(0, maxLength)}...`
            : name;
    };

    return (
        // 네비게이션 바
        <div className="navbar-container bg-gray-800 text-white">
            <nav className="navbar flex justify-between items-center p-4">
                <div className="flex items-center">
                    <div className="navbar-logo flex items-center">
                        <a
                            href={pathItemMap['home'].path}
                            className="flex items-center"
                        >
                            <img
                                src={logoPath}
                                alt="Commars"
                                className="w-8 mr-2"
                            />
                            Commars
                        </a>
                    </div>

                    <div className="navbar-menu ml-4">
                        <ul className="flex space-x-4">
                            <li>
                                <a
                                    href={pathItemMap['recommend'].path}
                                    className="hover:text-gray-400"
                                >
                                    {pathItemMap['recommend'].label}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={pathItemMap['ranking'].path}
                                    className="hover:text-gray-400"
                                >
                                    {pathItemMap['ranking'].label}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={pathItemMap['community'].path}
                                    className="hover:text-gray-400"
                                >
                                    {pathItemMap['community'].label}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-user flex items-center">
                    {user.isLoggedIn ? (
                        <div className="navbar-user-info flex items-center">
                            <img
                                src={user.profileImageUrl}
                                alt="user"
                                className="w-5 mr-2"
                            />
                            <Dropdown
                                options={dropdownOptions}
                                buttonLabel={`${formatUserName(user.name)}`}
                            />{' '}
                        </div>
                    ) : (
                        <div className="navbar-auth flex space-x-4">
                            <a
                                href="/login"
                                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-black dark:text-white bg-white dark:bg-[#1E2028] border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-[#252731] focus:outline-none"
                            >
                                로그인
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};
export default NavigationBar;
