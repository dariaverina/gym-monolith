import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModalWindow from "../../UI/Modal/ModalWindow";
import { ManagedUIContext } from '@/context/use-ui';
import { ContextProvider } from '@/context/context-provider';

export default function Layout({ children }) {
    return (
        <ContextProvider>
            <ManagedUIContext>
                <Header />
                <main>{children}</main>
                <Footer />
                <ModalWindow />
            </ManagedUIContext>
         </ContextProvider>
    );
}
