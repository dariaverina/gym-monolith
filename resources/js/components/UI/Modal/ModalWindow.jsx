import { Dialog } from "@headlessui/react"
import { useUI } from '@/context/use-ui';

export default function ModalWindow ({})  {
    const { displayModal, closeModal, modalContent } = useUI();
    return (
        <>
            <Dialog
                open={displayModal}
                onClose={() => closeModal()}
                className="relative z-40"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white">
                        <div className="min-h-full items-center justify-center">
                            {modalContent}
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}
