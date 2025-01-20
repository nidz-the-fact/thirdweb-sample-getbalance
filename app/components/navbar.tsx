"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { ConnectButton } from 'thirdweb/react';
import { client } from '../client';
import { createWallet } from 'thirdweb/wallets';
import { holesky } from '../chains/index';

export default function navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar variant="dense">
                    <Box sx={{ marginLeft: 'auto' }}>
                        <ConnectButton
                            client={client}
                            // ref.https://portal.thirdweb.com/typescript/v5/supported-wallets
                            wallets={[createWallet("io.metamask")]}
                            chain={holesky}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}