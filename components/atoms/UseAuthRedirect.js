import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuthRedirect = () => {
    const router = useRouter(); // Updated import from 'next/navigation'
    const [isUserFullyRegistered, setIsUserFullyRegistered] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isSigned = localStorage.getItem('isSigned');
            const userInfoString = localStorage.getItem('user');

            if (!userInfoString) {
                router.push('/auth/login'); // Navigation using the App Router
            } else {
                const userInfo = JSON.parse(userInfoString);
                if (userInfo.status === "1") {
                    setIsUserFullyRegistered(1);
                    setUser(userInfo);
                    if (document.querySelector('.userHeader--name span')) {
                        document.querySelector('.userHeader--name span').textContent = userInfo.first_name || '';
                    }
                }
            }
        }
    }, [router]);

    return { isUserFullyRegistered, user };
};

export default useAuthRedirect;
