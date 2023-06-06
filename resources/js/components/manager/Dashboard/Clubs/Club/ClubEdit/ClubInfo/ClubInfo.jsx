import { useState } from "react";
import { YMaps, Map, Placemark, Clusterer } from "react-yandex-maps";

export default function ClubInfo({ clubInfo, setClubInfo }) {
    const mapState = {
        center: [54.32096022627581, 48.447679630859355],
        zoom: 10,
    };
    const [coordinates, setCoordinates] = useState(clubInfo? [clubInfo.latitude, clubInfo.longitude] :[]);
    return (
        <>
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-white"
                >
                    Название клуба
                </label>
                <div className="mt-2">
                    <input
                        onChange={(e) =>
                            setClubInfo({ ...clubInfo, name: e.target.value })
                        }
                        value = {clubInfo.name}
                        name="name"
                        id="name"
                        className="block w-64 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mt-4">
                <label
                    htmlFor="seo_name"
                    className="block text-sm font-medium leading-6 text-white"
                >
                    SEO название
                </label>
                <div className="mt-2">
                    <input
                        onChange={(e) =>
                            setClubInfo({
                                ...clubInfo,
                                seo_name: e.target.value,
                            })
                        }
                        value={clubInfo.seo_name}
                        name="seo_name"
                        id="seo_name"
                        className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // placeholder=""
                    />
                </div>
            </div>
            <div className="mt-4">
                <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-white"
                >
                   Адрес
                </label>
                <div className="mt-2">
                    <input
                        onChange={(e) =>
                            setClubInfo({
                                ...clubInfo,
                                address: e.target.value,
                            })
                        }
                        value={clubInfo.address}
                        name="address"
                        id="address"
                        className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mt-6">
                <YMaps>
                    <Map
                        state={mapState}
                        onClick={(event) =>{
                            setCoordinates(event.get('coords'));
                            setClubInfo({
                                ...clubInfo,
                                latitude: event.get("coords")[0],
                                longitude: event.get("coords")[1],
                            })}
                        }
                    >
                        <Placemark geometry={coordinates} />
                    </Map>
                </YMaps>
            </div>
        </>
    );
}
