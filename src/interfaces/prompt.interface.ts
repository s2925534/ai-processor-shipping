// File Location: ./src/interfaces/prompt.interface.ts

// Shared address structure
    export interface Address {
    streetAddress?: string | null; // Street address (e.g., 123 Main St)
    city?: string | null; // City (e.g., Sydney)
    state?: string | null; // State (e.g., New South Wales)
    postalCode?: string | null; // Postal code (e.g., 2000)
    country?: string | null; // Country (e.g., Australia)
}

// Shared contact information structure
export interface ContactInfo {
    phone?: string | null; // Phone number (e.g., +1234567890)
    fax?: string | null; // Fax number (if applicable)
    email?: string | null; // Email address (e.g., example@example.com)
}

// Shared company information structure
export interface CompanyDetails {
    name?: string | null; // Company name (e.g., ABC Corporation)
    address?: Address | null; // Company address (if applicable)
}

// Shipping details related to containers and shipments
export interface ShippingDetails {
    portOfLoading?: string | null; // Port where goods are loaded (e.g., Port of Sydney)
    portOfDischarge?: string | null; // Port where goods are discharged (e.g., Port of Melbourne)
    vessel?: string | null; // Vessel name (e.g., "Sea Voyager")
    voyage?: string | null; // Voyage number or ID (e.g., "V12345")
    imoNumber?: string | null;
}

// Container details
export interface ContainerDetails {
    containerNumber: string;  // Required: Unique container number (e.g., "C12345")
    containerPin?: string | null; // Pin number for the container (if applicable)
    type?: string | null; // Container type (e.g., "Standard", "Reefer")
    size?: string | null; // Container size (e.g., "20ft", "40ft")
    sealNumber?: string | null; // Seal number (if applicable)
    reefer?: boolean | null; // Indicates if the container is refrigerated (true/false)
    weightKg?: number | null; // Weight of the container in kilograms (e.g., 1000)
    volumeM3?: number | null; // Volume of the container in cubic meters (e.g., 15)
    goodsDescription?: string | null; // Description of goods in the container
    goodsAvailableAt?: string | null; // Location where the goods are available for pickup
    emptyContainersReturnTo?: string | null; // Location where empty containers should be returned
    shippingDetails?: ShippingDetails | null;  // Consolidated shipping-related info
    billOfLading?: string | null; // Bill of lading number (e.g., "BOL12345")
    packaging?: string | null; // Type of packaging used (e.g., "Box", "Pallet")
    temperatureControl?: string | null; // Temperature control details (e.g., "2-8°C")
    customsStatus?: string | null; // Customs status (e.g., "Cleared", "Pending")
    specialInstructions?: string | null; // Special handling or shipping instructions
    deliveryAddress?: Address | null; // Delivery address for the container
    returnAddress?: Address | null; // Return address (if applicable)
}

// Document-related data
export interface DocumentData {
    shipmentDetails?: ShipmentDetails | null; // Shipment details (e.g., destination, transport)
    notifyParty?: CompanyDetails & ContactInfo | null; // Notify party for the shipment
    billsOfLading?: BillsOfLading | null; // Bills of Lading (shipping documents)
    goodsDescription?: string | null; // Description of the goods being shipped
    clientBookingReference?: string | null; // Client's booking reference for the shipment
    handlingDeliveryInstructions?: string | null; // Instructions for handling the delivery
    position?: string | null; // Position of the sender (e.g., "Shipping Manager")
    contactEmail?: string | null; // Email address of the contact
    containers?: ContainerDetails[] | null; // List of containers for this shipment
}

// Shipment details
export interface ShipmentDetails {
    goodsCollectedFrom?: PortDetails | null; // Port details where goods are collected from
    goodsDeliveredTo?: PortDetails | null; // Port details where goods are delivered to
    shippingDetails?: ShippingDetails | null;  // Reference to shared shipping details
}

// Notify Party structure (includes contact information)
export interface NotifyParty {
    name?: string | null; // Name of the notify party (e.g., "John Doe Logistics")
    address?: Address | null; // Notify party's address
    contactInfo?: ContactInfo | null; // Contact information for the notify party
}

// Consignor structure (company + contact)
export interface Consignor {
    name?: string | null; // Name of the consignor (sender of goods)
    address?: Address | null; // Consignor's address
    contactInfo?: ContactInfo | null; // Contact information for the consignor
}

// Consignee structure (company + contact)
export interface Consignee {
    name?: string | null; // Name of the consignee (receiver of goods)
    address?: Address | null; // Consignee's address
    contactInfo?: ContactInfo | null; // Contact information for the consignee
}

// Bills of Lading data
export interface BillsOfLading {
    billOfLadingNumber?: string | null; // Bill of lading number (unique identifier)
    consigneeDetails?: Consignee | null; // Consignee information related to the bill
    consignorDetails?: Consignor | null; // Consignor information related to the bill
}

// Port details (used in shipment-related structures)
export interface PortDetails {
    name?: string | null; // Name of the port (e.g., "Port of Sydney")
    code?: string | null; // Code representing the port (e.g., "SYD")
}

// Vessel information
export interface Vessel {
    name?: string | null; // Name of the vessel (e.g., "Sea Voyager")
    imoNumber?: string | null; // International Maritime Organization number (unique ship ID)
    vesselType?: string | null; // Type of vessel (e.g., "Cargo", "Tanker")
    flag?: string | null; // Country flag the vessel is registered under (e.g., "Australia")
}

// Email cover sheet structure
export interface EmailCoverSheet {
    subject?: string | null; // Subject of the email
    message?: string | null; // Message body of the email
    recipient?: string | null; // Recipient's email address
    sender?: string | null; // Sender's email address
}
export interface OpenAIPromptConfig {
    task: 'summarization' | 'categorization' | 'question_answering';
    inputText: string; // Input text for OpenAI processing
}

export interface OpenAIResponse {
    task: string;
    result: string; // Processed result from OpenAI
}
