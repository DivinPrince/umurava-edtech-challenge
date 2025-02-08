'use client'

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { closeCommunityModal } from "@/lib/redux/features/communitySlice"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"

export function CommunityModal() {
    const isOpen = useAppSelector((state) => state.community.isModalOpen)
    const dispatch = useAppDispatch()

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(closeCommunityModal())}>
            <DialogContent className="sm:max-w-[500px] space-y-6">
                <DialogHeader className="text-center space-y-6">
                    <div className="mx-auto mb-4">
                        <div className="size-28 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-14">
                                <path d="M14.7041 19.6345L12.0442 16.6103C10.7274 15.1131 10.6395 14.412 10.6581 14.3134L11.6564 13.5094L15.7027 10.3444C16.029 10.0892 16.0866 9.61786 15.8314 9.29159C15.5762 8.96533 15.1048 8.90772 14.7785 9.16292L10.728 12.3311L9.50989 13.3253C9.22553 13.6305 9.04418 14.1524 9.24197 14.8946C9.42654 15.5872 9.94427 16.5026 11.0466 17.7593L10.6395 18.5622C10.3765 18.9277 10.1324 19.2671 9.90771 19.4997C9.68445 19.7308 9.27877 20.0705 8.71374 19.9581C8.15614 19.8472 7.90592 19.3862 7.78203 19.0904C7.65621 18.7899 7.54964 18.3824 7.43402 17.9404L6.93252 16.0239C6.65396 14.9594 6.55777 14.6534 6.37651 14.4282C6.35363 14.3998 6.3298 14.3723 6.30509 14.3459C6.11372 14.141 5.84345 14.0149 4.8535 13.6181L4.79927 13.5963C3.82368 13.2053 3.02006 12.8832 2.45798 12.5667C1.91344 12.2601 1.3254 11.8144 1.25775 11.0623C1.24724 10.9454 1.24742 10.8278 1.25829 10.7109C1.32825 9.95901 1.91775 9.51516 2.46325 9.21037C3.02632 8.89576 3.83094 8.57633 4.80773 8.18854L16.7918 3.43052C18.0177 2.94379 19.02 2.54579 19.8076 2.36434C20.6106 2.17935 21.4401 2.15976 22.0901 2.76101C22.7273 3.35039 22.8036 4.18068 22.7242 5.01747C22.6454 5.8477 22.3864 6.92742 22.0669 8.2593L19.6472 18.3463C19.4436 19.1953 19.2717 19.9121 19.0655 20.4321C18.8573 20.9575 18.5233 21.5216 17.8484 21.7001C17.1654 21.8807 16.6009 21.544 16.1719 21.1809C15.7505 20.8243 15.2699 20.2779 14.7041 19.6345Z" fill="#2B71F0" />
                                <path d="M14.7042 19.6352L12.0443 16.611C10.7275 15.1139 10.6396 14.4127 10.6582 14.3141L11.6565 13.5101L15.7028 10.3451C16.0291 10.0899 16.0867 9.61857 15.8315 9.29231L22.0903 2.76172C22.7274 3.3511 22.8037 4.18139 22.7243 5.01819C22.6455 5.84841 22.3865 6.92813 22.067 8.26001L19.6474 18.347C19.4437 19.196 19.2719 19.9128 19.0657 20.4328C18.8574 20.9582 18.5234 21.5224 17.8486 21.7008C17.1655 21.8814 16.601 21.5447 16.172 21.1816C15.7506 20.825 15.2701 20.2786 14.7042 19.6352Z" fill="#7DA8F5" />
                            </svg>

                        </div>
                    </div>
                    
                    <DialogTitle className="text-2xl text-center">Join our WhatsApp community</DialogTitle>
                    <p className="text-muted-foreground/90 text-center text-lg">
                        Get notified on the latest projects<br />
                        and hackathons
                    </p>
                </DialogHeader>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="font-bold text-lg h-11">
                        <a href="http://shorturl.at/kB7PY" target="_blank" rel="noopener noreferrer">
                            Join
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
} 