import { useRouter } from 'next/router';
import {useAuthContext} from "@/providers/AuthProvider/AuthProvider";
import {useModalContext} from "@/providers/ModalProvider/ModalProvider";

const withAuth = <P extends object>(WrappedComponent, role?: string) => {
    return (props) => {
        const { user } = useAuthContext();
        const {setIsLoginModal} = useModalContext()
        const {replace} = useRouter();

        if (!user) {
            replace('/');
            setIsLoginModal(true)
            return null;
        }

        if (role && !user.roles.includes(role)) {
            replace('/');
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
