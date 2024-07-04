"use client"
import "./filters.css";
import React, { useState } from 'react';
import { MdFilterList } from "react-icons/md";
import { MultiSelect } from 'primereact/multiselect';
export default function Filters() {
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
    ];
    return (
        <>
         <div className="w-full my-3">
                <form className="flex flex-wrap gap-2">
                    <input className="text-[14px] rounded-md px-3 bg-white/20 transition text-white" type="text" placeholder="Search..."/>
                <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Type"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-white/20 hover:bg-amber-500 transition"
                />
                <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Genre"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-white/20 hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Country"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-white/20 hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Year"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-white/20 hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Rating"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-white/20 hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Quality"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-white/20 hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Recently Updated"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-white/20 hover:bg-amber-500 transition"
                />
                <button className="pbgColor flex items-center rounded-full text-white transition p-2 px-4 gap-2"><MdFilterList /> Filter</button>
                </form>
            </div>
        </>
    );
  }