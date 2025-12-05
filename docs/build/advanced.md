---
# docs/build/advanced.md

sidebar_position: 4
---

# Advanced Activities

Ready to take your EvoNext development skills to the next level? This section covers advanced techniques and patterns that will help you build more sophisticated, secure, and efficient applications on the Dash Platform.
<icon-grid columns={2}>
    <icon-card icon="🔧" title="Deep Integration">
        Explore advanced integration patterns for seamless EvoNext experiences.
    </icon-card>
    <icon-card icon="⚡" title="Performance Optimization">
        Learn techniques to build highly efficient and responsive applications.
    </icon-card>
</icon-grid>


## Advanced Identity Management

### Multi-Identity Strategies
<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">👥</div>
    <h3>Identity Hierarchies</h3>
    <p>Create structured relationships between multiple identities for complex use cases.</p>
  </div>
  <div class="icon-card">
    <div class="icon">🔄</div>
    <h3>Identity Rotation</h3>
    <p>Securely transition between identities while maintaining access to resources.</p>
  </div>
</div>

```javascript
// Example: Managing multiple identities with hierarchical relationships
const IdentityManager = {
    // Register a primary identity and subordinate identities
    async registerIdentities(primaryMnemonic, subordinateMnemonics) {
        const primaryIdentity = await this.registerIdentity(primaryMnemonic)
        const subordinateIdentities = []
        for (const mnemonic of subordinateMnemonics) {
            // Create subordinate identity
            const subordinateIdentity = await this.registerIdentity(mnemonic)
            // Link to primary identity
            await this.linkIdentities(primaryIdentity.id, subordinateIdentity.id)
            subordinateIdentities.push(subordinateIdentity)
        }
        return { primary: primaryIdentity, subordinates: subordinateIdentities }
    },
    // Create a hierarchical link between identities
    async linkIdentities(primaryId, subordinateId) {
        const identityLinkDocument = {
            primaryId,
            subordinateId,
            permissions: ['read', 'limited_write'],
            createdAt: Date.now()
        }
        return await client.documents.create(
            'evoNext.identityLinkContract',
            primaryId,
            identityLinkDocument
        )
    },
    // Rotate to a new identity while preserving relationships
    async rotateIdentity(currentIdentityId, newMnemonic) {
        // Create new identity
        const newIdentity = await this.registerIdentity(newMnemonic)
        // Transfer all links from old identity to new identity
        const links = await this.getIdentityLinks(currentIdentityId)
        for (const link of links) {
            if (link.primaryId === currentIdentityId) {
                await this.linkIdentities(newIdentity.id, link.subordinateId)
            }
            if (link.subordinateId === currentIdentityId) {
                await this.linkIdentities(link.primaryId, newIdentity.id)
            }
        }
        return newIdentity
    }
}
```

### Identity Verification Protocols
<icon-grid columns={2}>
    <icon-card icon="✔️" title="Decentralized Verification">
        Implement proof-of-ownership and verification mechanisms without centralized authorities.
    </icon-card>
    <icon-card icon="🔐" title="Zero-Knowledge Proofs">
        Leverage cryptographic techniques for selective credential disclosure.
    </icon-card>
</icon-grid>


## Advanced Contract Development

### Dynamic Contract Evolution
```javascript
// Example: Implementing versionable contracts with backward compatibility
class VersionableContract {
    constructor(initialContract, initialVersion = '1.0.0') {
        this.contracts = new Map()
        this.migrations = new Map()
        this.activeVersion = initialVersion
        this.contracts.set(initialVersion, initialContract)
    }
    // Add a new contract version
    addVersion(version, contractDefinition, migrationScript) {
        this.contracts.set(version, contractDefinition)
        if (migrationScript) {
            this.migrations.set(version, migrationScript)
        }
        return this
    }
    // Update to a new version
    async updateContract(newVersion, userId) {
        if (!this.contracts.has(newVersion)) {
            throw new Error(`Version ${newVersion} does not exist`)
        }
        // Check if migration is needed
        const migrationScript = this.migrations.get(newVersion)
        if (migrationScript) {
            await this.migrateData(this.activeVersion, newVersion, migrationScript, userId)
        }
        this.activeVersion = newVersion
        return this.contracts.get(newVersion)
    }
    // Migrate data between contract versions
    async migrateData(fromVersion, toVersion, migrationScript, userId) {
        // Fetch existing data
        const currentData = await this.fetchData(fromVersion, userId)
        // Apply migration script
        const migratedData = await migrationScript(currentData)
        // Store migrated data with new contract version
        await this.storeData(toVersion, userId, migratedData)
        return migratedData
    }
}
// Usage example
const userProfileContract = new VersionableContract(
    {
        // Version 1.0.0 contract definition
        properties: {
            username: { type: 'string' },
            bio: { type: 'string' }
        },
        required: ['username']
    },
    '1.0.0'
)
    .addVersion(
        '1.1.0',
        {
            // Version 1.1.0 contract definition with added fields
            properties: {
                username: { type: 'string' },
                bio: { type: 'string' },
                avatarUrl: { type: 'string' }  // Added field
            },
            required: ['username']
        },
        // Migration script from 1.0.0 to 1.1.0
        async (data) => {
            // Set default avatar URL for existing profiles
            return {
                ...data,
                avatarUrl: data.avatarUrl || 'https://evonext.app/default-avatar.png'
            }
        }
    )
```
### Composite Contract Patterns
<icon-grid columns={2}>
    <icon-card icon="🧩" title="Contract Composition">
        Combine multiple contracts to create sophisticated data structures.
    </icon-card>
    <icon-card icon="⛓️" title="Cross-Contract References">
        Referencing data across different contracts while maintaining consistency.
    </icon-card>
</icon-grid>
## Performance Optimization Techniques
### Efficient Document Querying
```javascript
// Example: Advanced document querying strategies
class DocumentOptimizer {
    // Batch document requests for network efficiency
    async batchDocuments(contractIds, documentTypes, queries) {
        const requests = []
        for (let i = 0; i < contractIds.length; i++) {
            requests.push(
                client.documents.get(contractIds[i], documentTypes[i], queries[i])
            )
        }
        return Promise.allSettled(requests)
    }
    // Implement client-side caching for frequently accessed documents
    constructor(ttl = 60000) {  // Default TTL of 1 minute
        this.cache = new Map()
        this.ttl = ttl
    }
    async getDocument(contractId, documentType, documentId) {
        const cacheKey = `${contractId}:${documentType}:${documentId}`
        // Check cache first
        const cached = this.cache.get(cacheKey)
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            return cached.data
        }
        // Fetch from network
        const document = await client.documents.get(
            contractId,
            documentType,
            documentId
        )
        // Cache the result
        this.cache.set(cacheKey, {document,
            timestamp: Date.now()
        })
        return document
    }
    // Preload documents that are likely to be accessed soon
    async preloadDocuments(contractId, documentType, documentIds) {
        const promises = documentIds.map(id =>
            this.getDocument(contractId, documentType, id)
                .catch(err => console.error(`Failed to preload document ${id}:`, err))
        )
        return Promise.allSettled(promises)
    }
}
```
### State Management Optimization
<icon-grid columns={2}>
    <icon-card icon="🗄️" title="State Minimization">
        Reduce document size by storing only essential data on-chain.
    </icon-card>
    <icon-card icon="📦" title="Batch Operations">
        Group multiple operations into single transactions for efficiency.
    </icon-card>
</icon-grid>
## Security Best Practices
### Advanced Access Control
```javascript
// Example: Implementing fine-grained permissions system
class AccessControl {
    constructor() {
        this.roles = new Map()
        this.permissions = new Map()
        this.userRoles = new Map()
    }
    // Define a role with specific permissions
    defineRole(roleName, permissions) {
        this.roles.set(roleName, permissions)
        return this
    }
    // Assign a role to a user
    assignRole(userId, roleName, context = {}) {
        if (!this.userRoles.has(userId)) {
            this.userRoles.set(userId, [])
        }
        this.userRoles.get(userId).push({
            role: roleName,
            context,
            assignedAt: Date.now()
        })
        return this
    }
    // Check if a user has permission to perform an action
    async can(userId, permission, resource, context = {}) {
        const userRoles = this.userRoles.get(userId) || []
        for (const { role, context: roleContext } of userRoles) {
            const rolePermissions = this.roles.get(role) || []
            for (const perm of rolePermissions) {
                // Check if permission matches
                if (typeof perm === 'string' && perm === permission) {
                    return true
                }
                // Check advanced permission with conditions
                if (typeof perm === 'object' && perm.name === permission) {
                    if (await this.evaluateConditions(
                        perm.conditions,
                        { ...roleContext, ...context },
                        resource
                    )) {
                        return true
                    }
                }
            }
        }
        return false
    }
    // Evaluate complex permission conditions
    async evaluateConditions(conditions, context, resource) {
        // Example: Check ownership condition
        if (conditions.owner && resource.ownerId === context.userId) {
            return true
        }
        // Example: Check time-based conditions
        if (conditions.timeRestriction) {
            const now = Date.now()
            const { start, end } = conditions.timeRestriction
            if (now < start || now > end) {
                return false
            }
        }
        return true
    }
}
// Usage example
const accessControl = new AccessControl()
// Define roles
accessControl.defineRole('admin', [
    'read',
    'write',
    'delete',
    {
        name: 'manage_users',
        conditions: {
            timeRestriction: {
                start: Date.now(),
                end: Date.now() + 24 * 60 * 60 * 1000  // 24 hours
            }
        }
    }
])
accessControl.defineRole('user', [
    'read',
    {
        name: 'write',
        conditions: {
            owner: true  // Only allow write to resources they own
        }
    }
])
// Assign roles
await accessControl.assignRole('user123', 'user')
await accessControl.assignRole('admin456', 'admin')
// Check permissions
const canDelete = await accessControl.can(
    'user123',
    'delete',
    { ownerId: 'otherUser789' }
)  // Returns false, user can't delete resources they don't own
```
### Cryptographic Security
<icon-grid columns={2}>
    <icon-card icon="🔐" title="Advanced Encryption">
        Implement end-to-end encryption for sensitive data contracts.
    </icon-card>
    <icon-card icon="🔑" title="Multi-Signature Schemes">
        Require multiple parties to approve critical operations.
    </icon-card>
</icon-grid>
## Cross-Platform Integration
### External API Integration
```javascript
// Example: Secure integration with external APIs
class ExternalAPIIntegrator {
    constructor() {
        this.integrations = new Map()
        this.rateLimiters = new Map()
    }
    // Register an external API integration
    registerIntegration(name, config) {
        this.integrations.set(name, {
            baseURL: config.baseURL,
            apiKey: config.apiKey,
            rateLimit: config.rateLimit || { requests: 100, window: 60000 },
            cache: config.cache || false,
            transform: config.transform || (data) => data
        })
        // Initialize rate limiter
        this.rateLimiters.set(
            name,
            new RateLimiter(config.rateLimit)
        )
        return this
    }
    // Make authenticated request to external API
    async request(integrationName, endpoint, options = {}) {
        const integration = this.integrations.get(integrationName)
        if (!integration) {
            throw new Error(`Integration ${integrationName} not found`)
        }
        // Check rate limits
        await this.rateLimiters.get(integrationName).check()
        const url = `${integration.baseURL}${endpoint}`
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${integration.apiKey}`,
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        }
        try {
            const response = await fetch(url, requestOptions)
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`)
            }
            const data = await response.json()
            // Transform the data if needed
            return integration.transform(data)
        } catch (error) {
            console.error(`Error making request to ${integrationName}:`, error)
            throw error
        }
    }
    // Cache API responses
    async requestWithCache(integrationName, endpoint, options = {}, ttl = 300000) {
        const key = `${integrationName}:${endpoint}:${JSON.stringify(options)}`
        const cached = localStorage.getItem(key)
        if (cached) {
            const { data, timestamp } = JSON.parse(cached)
            if (Date.now() - timestamp < ttl) {
                return data
            }
        }
        const data = await this.request(integrationName, endpoint, options)
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }))
        return data
    }
}
// Rate limiter implementation
class RateLimiter {
    constructor({ requests, window }) {
        this.requests = requests
        this.window = window
        this.requestTimes = []
    }
    async check() {
        const now = Date.now()
        // Remove old request timestamps outside the window
        this.requestTimes = this.requestTimes.filter(
            timestamp => now - timestamp < this.window
        )
        // Check if we've exceeded the limit
        if (this.requestTimes.length >= this.requests) {
            const oldestRequest = Math.min(...this.requestTimes)
            const waitTime = this.window - (now - oldestRequest)
            if (waitTime > 0) {
                await new Promise(resolve => setTimeout(resolve, waitTime))
                return this.check()  // Check again after waiting
            }
        }
        // Add current request timestamp
        this.requestTimes.push(now)
    }
}
```
## Advanced EvoApp Architecture
### Micro-Frontend Pattern
<icon-grid columns={2}>
    <icon-card icon="🧩" title="Modular Architecture">
        Build complex apps from smaller, independently deployable modules.
    </icon-card>
    <icon-card icon="🔄" title="Runtime Integration">
        Dynamically load and unload modules based on user needs.
    </icon-card>
</icon-grid>
```javascript
// Example: Micro-frontend framework for EvoApps
class MicroFrontendFramework {
    constructor() {
        this.modules = new Map()
        this.routes = new Map()
        this.container = document.getElementById('app-container')
    }
    // Register a micro-module
    registerModule(name, config) {
        this.modules.set(name, {
            url: config.url,
            scope: config.scope,
            container: config.container || `${name}-container`,
            routes: config.routes || {},
            dependencies: config.dependencies || [],
            loaded: false
        })
        // Register routes
        for (const route in config.routes) {
            this.routes.set(route, name)
        }
        return this
    }
    // Load a module on demand
    async loadModule(name) {
        const module = this.modules.get(name)
        if (!module) {
            throw new Error(`Module ${name} not found`)
        }
        if (module.loaded) {
            return module
        }
        // Load dependencies first
        for (const dep of module.dependencies) {
            await this.loadModule(dep)
        }
        // Create container for the module
        const container = document.createElement('div')
        container.id = module.container
        container.className = 'module-container'
        // Load module script
        await this.loadScript(module.url)
        // Initialize the module
        const moduleInit = window[module.scope]
        if (typeof moduleInit === 'function') {
            module.instance = moduleInit(container)
        }
        module.loaded = true
        this.container.appendChild(container)
        return module
    }
    // Navigate to a specific route
    async navigate(route) {
        const moduleName = this.routes.get(route)
        if (!moduleName) {
            throw new Error(`No module found for route ${route}`)
        }
        // Load the module
        const module = await this.loadModule(moduleName)
        // Call the route handler if it exists
        if (module.instance[route]) {
            module.instance[route]()
        }
    }
    // Load a script dynamically
    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = url
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
        })
    }
}
// Usage example
const appFramework = new MicroFrontendFramework()
// Register modules
appFramework
    .registerModule('profile', {
        url: 'https://cdn.evonext.app/profile.js',
        scope: 'ProfileModule',
        routes: {
            '/profile': 'showProfile',
            '/profile/edit': 'editProfile'
        },
        dependencies: ['auth']
    })
    .registerModule('feed', {
        url: 'https://cdn.evonext.app/feed.js',
        scope: 'FeedModule',
        routes: {
            '/feed': 'showFeed',
            '/feed/saved': 'showSavedItems'
        }
    })
    .registerModule('auth', {
        url: 'https://cdn.evonext.app/auth.js',
        scope: 'AuthModule',
        routes: {
            '/login': 'showLogin',
            '/register': 'showRegister'
        }
    })
// Navigate to initial route
appFramework.navigate('/profile')
```
## Scaling Strategies
### Horizontal Scaling Techniques
<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">⚖️</div>
    <h3>Data Sharding</h3>
    <p>Distribute data across multiple contracts for improved performance.</p>
  </div>
  <div class="icon-card">
    <div class="icon">🔄</div>
    <h3>Load Distribution</h3>
    <p>Balance user interactions across multiple identity providers.</p>
  </div>
</div>
```javascript
// Example: Data sharding for large-scale applications
class DataSharding {
    constructor() {
        this.shards = new Map()
        this.shardCount = 10
    }
    // Determine which shard should contain a specific item
    getShardKey(itemId) {
        // Simple hash-based sharding
        let hash = 0
        for (let i = 0; i < itemId.length; i++) {
            const char = itemId.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash  // Convert to 32-bit integer
        }
        return Math.abs(hash) % this.shardCount
    }
    // Get the contract ID for a specific shard
    getShardContractId(baseContractId, shardKey) {
        return `${baseContractId}-shard-${shardKey}`
    }
    // Store an item in the appropriate shard
    async storeItem(baseContractId, itemType, itemId, itemData) {
        const shardKey = this.getShardKey(itemId)
        const contractId = this.getShardContractId(baseContractId, shardKey)
        return await client.documents.create(
            contractId,
            itemType,
            {
                shardKey,
                ...itemData
            }
        )
    }
    // Retrieve an item from the appropriate shard
    async getItem(baseContractId, itemType, itemId) {
        const shardKey = this.getShardKey(itemId)
        const contractId = this.getShardContractId(baseContractId, shardKey)
        return await client.documents.get(contractId, itemType, itemId)
    }
    // Query across all shards
    async queryAllShards(baseContractId, itemType, query) {
        const results = []
        // Query each shard in parallel
        const shardPromises = []
        for (let i = 0; i < this.shardCount; i++) {
            const contractId = this.getShardContractId(baseContractId, i)
            shardPromises.push(
                client.documents.get(contractId, itemType, query)
                    .then(shardResults => ({ shardKey: i, results: shardResults }))
                    .catch(err => ({ shardKey: i, error: err }))
            )
        }
        const shardResults = await Promise.all(shardPromises)
        // Combine results
        for (const { shardKey, results, error } of shardResults) {
            if (error) {
                console.error(`Error querying shard ${shardKey}:`, error)
                continue
            }
            results.push(...results)
        }
        return results
    }
}
```
## Troubleshooting Advanced Issues
<icon-grid columns={2}>
    <icon-card icon="🔍" title="Debugging Techniques">
        Advanced strategies for diagnosing complex issues in your EvoApps.
    </icon-card>
    <icon-card icon="📊" title="Performance Monitoring">
        Set up monitoring to track app performance and user experience.
    </icon-card>
</icon-grid>
:::tip Need More Advanced Examples?
Check out our [Examples](./examples) page for practical implementations of these advanced techniques, or explore our GitHub repository for complete source code and tutorials.
:::
Ready for deployment? Once you've mastered these advanced techniques, our [Deploy guide](./deploy) will help you publish your app to the Dash Platform.
