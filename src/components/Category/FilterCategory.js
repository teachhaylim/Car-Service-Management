import React, { useState } from 'react';
import { Badge, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Popover, Radio, RadioGroup, Typography } from "@mui/material";
import { FilterAlt, FilterList } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FilterCategory = ({ handleFilter }) => {
    const [filterMenu, setFilterMenu] = useState(null);
    const [filter, setFilter] = useState({ name: 0, createAt: 0, updateAt: 0 });
    const [isFilter, setIsFilter] = useState(false);
    const { t } = useTranslation();

    const handleLangOnClose = () => {
        setFilterMenu(null);
    };

    const handleFilterMenu = (e) => {
        setFilterMenu(e.currentTarget);
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: Number(e.target.value) });
    }

    const handleFilterConfirm = () => {
        handleFilter(filter);
        setFilterMenu(null);
        setIsFilter(true);
    };

    const handleFilterReset = () => {
        handleFilter({});
        setFilter({ name: 0, createAt: 0, updateAt: 0 });
        setFilterMenu(null);
        setIsFilter(false);
    }

    return (
        <>
            <IconButton color={isFilter ? "secondary" : "default"} onClick={handleFilterMenu}>
                <Badge color="secondary" variant="dot" invisible={!isFilter}>
                    {isFilter ? <FilterAlt /> : <FilterList />}
                </Badge>
            </IconButton>

            <Popover
                anchorEl={filterMenu}
                open={!!filterMenu}
                onClose={handleLangOnClose}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Grid item sx={{ padding: 2 }}>
                    <Grid item sx={{ mb: 0 }}>
                        <Typography variant="h6">{t("filterOption")}</Typography>
                    </Grid>

                    <Grid item sx={{ my: 1 }}>
                        <FormControl>
                            <FormLabel>{t("categoryName")}</FormLabel>
                            <RadioGroup row name="name" value={filter.name} onChange={handleFilterChange}>
                                <FormControlLabel value={1} control={<Radio />} label={t("asc")} />
                                <FormControlLabel value={-1} control={<Radio />} label={t("desc")} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item sx={{ my: 1 }}>
                        <FormControl>
                            <FormLabel>{t("createAt")}</FormLabel>
                            <RadioGroup row name="createAt" value={filter.createAt} onChange={handleFilterChange}>
                                <FormControlLabel value={1} control={<Radio />} label={t("asc")} />
                                <FormControlLabel value={-1} control={<Radio />} label={t("desc")} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item sx={{ my: 1 }}>
                        <FormControl>
                            <FormLabel>{t("updateAt")}</FormLabel>
                            <RadioGroup row name="updateAt" value={filter.updateAt} onChange={handleFilterChange}>
                                <FormControlLabel value={1} control={<Radio />} label={t("asc")} />
                                <FormControlLabel value={-1} control={<Radio />} label={t("desc")} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Button variant="contained" size="small" onClick={handleFilterConfirm}>
                            {t("applyFilter")}
                        </Button>

                        <Button variant="outlined" color="error" size="small" onClick={handleFilterReset}>
                            {t("resetFilter")}
                        </Button>
                    </Grid>
                </Grid>
            </Popover>
        </>
    )
}

export default FilterCategory
