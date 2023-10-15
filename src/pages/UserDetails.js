import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Link,
} from '@mui/material';
import ProfilePage from './ProfilePage';
import Clock from './Clock';
import SelectField from '../Components/SelectField';
import './style.css';

function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('None');
    const [isLoading, setIsLoading] = useState(true);
    const [unixTimestamp, setUnixTimestamp] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await api.getUserDetails(id);
                const countriesData = await api.getCountries();

                if (selectedCountry !== 'None') {
                    const timer = await api.getTimer(selectedCountry);
                    setUnixTimestamp(timer?.unixtime);
                } else {
                    setUnixTimestamp(null);
                }

                setUser(userData);
                setCountries(countriesData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, selectedCountry]);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCountry(selectedValue);
    };

    return (
        <Box className='user-details-container'>
            <Card variant='outlined' className='user-details-card'>
                <CardContent>
                    <Box className='header-container '>
                        <Box className='back-link'>
                            <Link href='/' underline='none' className='back-link-text'>
                                Back
                            </Link>
                        </Box>
                        <Box className='select-container'>
                            {!isLoading && countries.length > 0 ? (
                                <SelectField
                                    value={selectedCountry}
                                    options={countries}
                                    onChange={handleSelectChange}
                                />
                            ) : null}
                        </Box>
                        <Box className='mobileViewDisable'>{unixTimestamp ? (<Clock unixTimestamp={unixTimestamp} />) : (<Box className='timerText'>Select country to enable digital clock</Box>)}</Box>
                    </Box>
                    <Box className='mobileViewEnable'>{unixTimestamp ? (<Clock unixTimestamp={unixTimestamp} />) : (<Box className='timerText'>Select country to enable digital clock</Box>)}</Box>
                    <Grid container spacing={2}>
                        {user && (
                            <Grid item xs={12} sm={12} md={12} lg={12} key={user.id}>
                                <ProfilePage user={user} />
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UserDetails;
