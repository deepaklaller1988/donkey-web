"use client"
import "./filters.css";
import React, {  useEffect,  useState } from 'react';
import { MdFilterList } from "react-icons/md";
import { MultiSelect } from 'primereact/multiselect';
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";


const fetchGenre = async (mediaType:string) => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/genre/${mediaType.toLowerCase()}/list?language=en-US`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  };


  const fetchCountries = async () => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/configuration/countries?language=en-US`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  };


export default function Filters({handleFilters, initiallySelected, initiallySearch}:any) {
    const [selectedType, setSelectedType] = useState<any>(null);
    const [selectedGenre, setSelectedGenre] = useState<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedYear, setSelectedYear] = useState<any>(null);
    const [selectedFilter, setSelectedFilter] = useState<any>(null);
    const [searchQuery, setSearchQuery] =  useState<string>("");
    const {
        data: movieGenre,
    } = useQuery<any>({
        queryKey: ['get-genre', 'movie'],
        queryFn: () =>fetchGenre('movie'),
    });

    const {
        data: tvGenre,
    } = useQuery<any>({
        queryKey: ['get-genre', 'tv'],
        queryFn: () =>fetchGenre('tv'),
    });

    const {
        data: countries,
    } = useQuery<any>({
        queryKey: ['get-country'],
        queryFn: fetchCountries,
    });

    const popularOptions = [
        { name: 'Popular', code: 'popularity.desc' },
        { name: 'Latest', code: 'primary_release_date.desc' },
        { name: 'Name A-Z', code: 'title.asc' },
        { name: 'Name Z-A', code: 'title.desc' },
        // { name: 'Highest Earning', code: 'revenue.desc' },
        { name: 'Most Voted', code: 'vote_count.desc' },
    ];

    const currentYear = moment().year();

    const startYear = currentYear - 25;

    // Create an array of objects for the years in between
    const yearsArray: any = [];
    for (let year = currentYear; year >= startYear; year--) {
    yearsArray.push({ year: year });
    }
    console.log(yearsArray,"===")

    const type = [
        { name: 'Movie', code: 'movie' },
        { name: 'TV-Shows', code: 'tv' },
    ];

    const allGenres = [...(movieGenre?.genres || []), ...(tvGenre?.genres || [])];
    let genres = Array.from(new Map(allGenres.map(genre => [genre.id, genre])).values()).sort((a,b) => a.name.localeCompare(b.name));

    useEffect(()=>{
        if(initiallySearch){
            setSearchQuery(initiallySearch)
        }
    },[initiallySearch])

    useEffect(()=>{
        if(initiallySelected){
            if(type){
                setSelectedType(type.filter((item:any) => item?.code === initiallySelected.selectedMedia))
            }
            if(popularOptions){
                setSelectedFilter(popularOptions.filter((item:any) => item?.code === initiallySelected.selectedFilter))
            }
            if(yearsArray && yearsArray.length > 0){
                setSelectedYear(yearsArray.filter((item:any) => item?.year == initiallySelected.selectedYear))
            }
            if(genres && genres.length > 0){
                let genArr = initiallySelected?.selectedGenres.split(",").map((arr:any)=> parseInt(arr));
                setSelectedGenre(genres.filter((item:any) => genArr.includes(item.id)))
            }
            if(countries && countries.length > 0){
                let genArr = initiallySelected?.selectedCountry.split(",");
                setSelectedCountry(countries?.filter((item:any) => genArr.includes(item.iso_3166_1)));
            }
        }

    },[initiallySelected, countries, movieGenre, tvGenre]);

    const handleSelection = (e: any) =>{
        const {name,value} = e.target;
        if(name=== 'type'){
            setSelectedType(value)
        }
        if(name=== 'year'){
            setSelectedYear(value)
        }
     
        if(name=== 'genre'){
            setSelectedGenre(value)
        }
        if(name=== 'country'){
            setSelectedCountry(value)
        }
        if(name=== 'filter'){
            setSelectedFilter(value)
        }
    }


    const onSubmit = () =>{
        const selected = {
            selectedType: selectedType ? selectedType.map((val: any)=>val.code).join(",") : "",
            selectedGenre: selectedGenre ? selectedGenre.map((val: any)=>val.id).join(",") : "",
            selectedCountry:selectedCountry ? selectedCountry.map((val: any)=>val.iso_3166_1).join(",") : "",
            selectedYear: selectedYear ? selectedYear.map((val: any)=>val.year).join(",") : "",
            selectedFilter:selectedFilter ? selectedFilter.map((val: any)=>val.code).join(",") : ""
        }

        if(selected.selectedType === 'tv'){
            if(selectedFilter && selectedFilter.length > 0){
                if(selectedFilter[0].name === 'Latest'){
                    selected.selectedFilter = 'first_air_date.desc'
                }
                if(selectedFilter[0].name === 'Name A-Z'){
                    selected.selectedFilter = 'name.asc'
                }
                if(selectedFilter[0].name === 'Name Z-A'){
                    selected.selectedFilter = 'name.desc'
                }
            }
        }

        handleFilters(selected, searchQuery);
    }
    

    return (
        <>
         <div className="w-full my-3">
                <div className="flex flex-wrap gap-2">
                    <input className="text-[14px] rounded-md px-3 bg-[#272727] transition text-white" type="text" placeholder="Search..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
                <MultiSelect
                    value={selectedType}
                    onChange={(e) => handleSelection(e)}
                    name="type"
                    options={type}
                    optionLabel="name"
                    placeholder="Type"
                    maxSelectedLabels={1}
                    selectionLimit={1}
                    className="customSelect rounded-md bg-[#272727] hover:bg-amber-500 transition sandeep"
                />
                <MultiSelect
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.value)}
                    options={genres}
                    name="genre"
                    optionLabel="name"
                    placeholder="Genre"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-[#272727] hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.value)}
                    options={countries}
                    name="country"
                    optionLabel="english_name"
                    placeholder="Country"
                    maxSelectedLabels={1}
                    className="customSelect rounded-md bg-[#272727] hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedYear}
                    // defaultChecked={true}
                    onChange={(e) => setSelectedYear(e.value)}
                    // selectAll={true}
                    options={yearsArray}
                    name="year"
                    optionLabel="year"
                    placeholder="Year"
                    // maxSelectedLabels={1}
                    selectionLimit={1}
                    className="customSelect rounded-md bg-[#272727] hover:bg-amber-500 transition"
                />
                 <MultiSelect
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.value)}
                    options={popularOptions}
                    name="filter"
                    optionLabel="name"
                    placeholder="Popular"
                    maxSelectedLabels={1}
                    selectionLimit={1}
                    className="customSelect rounded-md bg-[#272727] hover:bg-amber-500 transition"
                />
                <button className="pbgColor flex items-center rounded-full text-[#272727] transition p-2 px-4 gap-2" onClick={onSubmit} ><MdFilterList /> Filter</button>
                </div>
            </div>
        </>
    );
  }