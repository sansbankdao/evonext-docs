---
# docs/build/wallets.md

sidebar_position: 3
---

# Interacting with Wallets

Learn how to connect various Dash wallets to EvoNext and manage your digital assets securely within our ecosystem.

<icon-grid columns={2}>
    <icon-card icon="💼" title="Multi-Wallet Support">
        EvoNext is compatible with a wide range of Dash wallets, offering flexibility and choice for users.
    </icon-card>
    <icon-card icon="🔒" title="Secure Connections">
        Our wallet integration prioritizes security, ensuring your private keys never leave your device.
    </icon-card>
</icon-grid>

## Supported Wallets

### Desktop Wallets

<icon-grid columns={3}>
    <icon-card icon="🖥️" title="Dash Core">
        The official Dash wallet offering full node functionality and complete control over your funds.
    </icon-card>
    <icon-card icon="💡" title="DashPay">
        A user-friendly wallet with integrated Platform Identity features for interacting with EvoNext.
    </icon-card>
    <icon-card icon="🔄" title="Electrum-Dash">
        A lightweight wallet option with fast startup and lower resource requirements.
    </icon-card>
</icon-grid>

### Mobile Wallets

<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">📱</div>
    <h3>DashPay Mobile</h3>
    <p>The official mobile wallet for Dash, featuring Platform Identity support and EvoNext integration.</p>
  </div>
  <div class="icon-card">
    <div class="icon">💛</div>
    <h3>Third-Party Options</h3>
    <p>Several third-party wallets support Dash and may offer varying levels of EvoNext compatibility.</p>
  </div>
</div>

## Setting Up Your Wallet

### For Desktop Users

Follow these steps to connect your desktop wallet to EvoNext:

1. Ensure your wallet is updated to the latest version
2. Enable Platform features in wallet settings (if available)
3. Navigate to the connection section in EvoNext
4. Select your wallet type from the available options
5. Follow the specific connection instructions for your wallet
6. Approve the connection request in your wallet

### For Mobile Users

To connect your mobile wallet:

1. Install a compatible wallet from the app store
2. Open EvoNext and navigate to the wallet connection section
3. Select mobile wallet option
4. Scan the QR code with your mobile wallet app
5. Confirm connection request on your mobile device

:::tip Connection Method

The exact connection steps may vary slightly between wallets. Always follow the specific instructions provided by your wallet provider.

:::

## Managing Your Identity and Transactions

### Identity Operations

<icon-grid columns={2}>
    <icon-card icon="🆔" title="Identity Creation">
        Create your unique Dash Platform Identity directly within your wallet or through the EvoNext interface.
    </icon-card>
    <icon-card icon="✏️" title="Profile Updates">
        Update your EvoNext profile and associated information through connected wallet approval.
    </icon-card>
</icon-grid>

### Transaction Handling

<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">💸</div>
    <h3>Sending Transactions</h3>
    <p>Initiate Dash transactions through EvoNext with confirmation required in your connected wallet.</p>
  </div>
  <div class="icon-card">
    <div class="icon">📊</div>
    <h3>Transaction History</h3>
    <p>View your complete transaction history within EvoNext, cross-referenced with wallet records.</p>
  </div>
</div>

## Security Best Practices

When interacting with wallets and EvoNext:

:::warning Security Reminders

- Double-check transaction amounts before confirming in your wallet
- Never share your seed phrase or private keys with anyone
- Verify you're connecting to the official EvoNext application
- Consider using a hardware wallet for enhanced security
- Keep your wallet software up to date

:::

### Hardware Wallet Integration

For maximum security, consider using a hardware wallet:

<icon-grid columns={3}>
    <icon-card icon="🔐" title="Ledger">
        Connect your Ledger device for secure transaction signing without exposing private keys.
    </icon-card>
    <icon-card icon="🛡️" title="Trezor">
        Use your Trezor hardware wallet with EvoNext for maximum peace of mind.
    </icon-card>
    <icon-card icon="🔌" title="Setup Guide">
        Follow our [hardware wallet setup guide](./hardware-wallets) for detailed instructions.
    </icon-card>
</icon-grid>

## Troubleshooting

### Common Connection Issues

<icon-grid columns={2}>
    <icon-card icon="❌" title="Connection Failed">
        Ensure both EvoNext and your wallet are updated to the latest versions.
    </icon-card>
    <icon-card icon="🔄" title="Syncing Issues">
        Verify that your wallet is fully synced with the Dash network before attempting to connect.
    </icon-card>
</icon-grid>

### Transaction Problems

If you encounter issues with transactions through EvoNext:

1. Check your wallet connection status
2. Verify sufficient Dash balance for network fees
3. Check for network congestion affecting transaction times
4. Ensure all required EvoNext permissions are approved in your wallet
5. Restart both EvoNext and your wallet if issues persist

## Advanced Features

### Multi-Signature Wallets

For advanced users requiring additional security layers:

```bash
# Example multi-sig verification command
evonext verify-multisignature --wallet-type "advanced" --threshold 2 --signatories 3
```

### dApp Integration

Developers can integrate EvoNext with custom wallet solutions:

```javascript
// Example wallet connection code
const connectWallet = async () => {
    try {
        const dashWallet = await window.dash.connect();
        const account = await dashWallet.getAccount();

        // Use the account with EvoNext
        await evonext.connectAccount(account);

        console.log('Wallet connected successfully!');
    } catch (error) {
        console.error('Failed to connect wallet:', error);
    }
};
```

:::info Developer Resources

For more detailed documentation on wallet integration, check out our [Developer Guide](../developer/wallet-integration).

:::

## Need Help?

If you're experiencing issues with wallet connectivity:

1. Consult our [Troubleshooting Guide](../safu#troubleshooting)
2. Visit the [Dash Platform documentation](https://docs.dash.org/en/stable/)
3. Connect with our community on the [Dash Forum](https://www.dash.org/forum/)
4. Contact support at [@EvoNextSocial](https://x.com/EvoNextSocial) on X
