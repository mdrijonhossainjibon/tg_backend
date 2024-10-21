/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminWallet
// ====================================================

export interface AdminWallet_adminWallet_settings {
  
  uri: string;
  secret: string;
  access_token: string;
  testnet: boolean;
  wallet_id: string;
}

export interface AdminWallet_adminWallet_blockchain {
   
  name: string;
  key: string;
  id: number;
  enabled: boolean;
}

export interface AdminWallet_adminWallet_currency {
  
  visible: boolean;
  type: string;
  code: string;
  name: string;
  explorer_address: string;
}

export interface AdminWallet_adminWallet {
   
  address: string;
  blockchain_key: string;
  currency_code: string;
  gateway: string;
  id: number;
  kind: string;
  max_balance: string;
  name: string;
  settings: AdminWallet_adminWallet_settings;
  blockchain: AdminWallet_adminWallet_blockchain;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
  currency: AdminWallet_adminWallet_currency;
}

export interface AdminWallet {
  adminWallet: AdminWallet_adminWallet;
}

export interface AdminWalletVariables {
  _barong_session?: string;
  id?: number;
}
