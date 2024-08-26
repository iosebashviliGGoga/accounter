import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuthRedirect = () => {
    const router = useRouter(); // Updated import from 'next/navigation'
    const [isUserFullyRegistered, setIsUserFullyRegistered] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log('first to run')
        if (typeof window !== 'undefined') {
            const isSigned = localStorage.getItem('isSigned');
            const userInfoString = localStorage.getItem('user');
            console.log('first to run 1')
            if (!userInfoString) {
                console.log('first to run 2')
                router.push('/auth/login'); // Navigation using the App Router
               // window.location.href = '/auth/login'
            } else {
                console.log('first to run 3')
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
