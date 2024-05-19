import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  ChartPieIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import clsx from "clsx";
import { useUI } from "@/context/use-ui";
import Auth from "../../UI/Modal/ModalContent/Auth/Auth";
import { userStateContext } from "@/context/context-provider";
import axiosClient from "@/public/axios";
import ManagerHeader from "./manager/ManagerHeader";
import ClientHeader from "./client/ClientHeader";
import TrainerHeader from "./trainer/TrainerHeader";

export default function Header() {
  const { currentUser, setCurrentUser, setUserToken } = userStateContext();

  const logout = (e) =>{
    e.preventDefault();
    axiosClient.post('/logout')
    .then(res =>{
      setCurrentUser(undefined);
      setUserToken(null);
    })
  }
  
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        // console.log(data);
        data != undefined && setCurrentUser(data)
      })
  }, [])
  return (
    <>
      {(currentUser && currentUser.user_type == 'm') ? <ManagerHeader/> : (currentUser && currentUser.user_type == 't')?<TrainerHeader/>:<ClientHeader/>}
    </>
  );
}