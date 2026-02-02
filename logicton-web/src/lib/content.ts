import fs from 'fs';
import path from 'path';
import { CompanyInfo, TeamMember, Service, PortfolioItem, SiteConfig } from '@/types';
import {
  companyInfoSchema,
  servicesPayloadSchema,
  portfolioPayloadSchema,
  siteConfigSchema
} from '@/lib/validation';

// Try multiple possible content paths
const POSSIBLE_CONTENT_PATHS = [
  './logicton-web/content',
  'logicton-web/content',
  '../logicton-web/content',
  './content',
  process.env.CONTENT_PATH || './logicton-web/content'
].filter(Boolean);

function getValidContentPath(): string {
  console.log('[Content] Current working directory:', process.cwd());
  for (const testPath of POSSIBLE_CONTENT_PATHS) {
    const fullPath = path.join(process.cwd(), testPath);
    console.log(`[Content] Testing path: ${testPath} -> ${fullPath}`);
    console.log(`[Content] Path exists: ${fs.existsSync(fullPath)}`);
    if (fs.existsSync(fullPath)) {
      console.log('[Content] Found valid content path:', fullPath);
      return testPath;
    }
  }
  console.log('[Content] Using default content path: logicton-web/content');
  return 'logicton-web/content';
}

const CONTENT_PATH = getValidContentPath();

// Helper function to read JSON files
async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const fullPath = path.join(process.cwd(), CONTENT_PATH, filePath);
    console.log(`[readJsonFile] Attempting to read: ${fullPath}`);
    console.log(`[readJsonFile] File exists: ${fs.existsSync(fullPath)}`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Helper function to write JSON files
async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  try {
    const fullPath = path.join(process.cwd(), CONTENT_PATH, filePath);
    const dir = path.dirname(fullPath);
    
    console.log(`[writeJsonFile] Attempting to write: ${fullPath}`);
    
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      console.log(`[writeJsonFile] Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
}

// Company content functions
export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  const data = await readJsonFile<CompanyInfo>('company/info.json');
  const parsed = companyInfoSchema.safeParse(data);
  if (!parsed.success) {
    console.error('Invalid company info content', parsed.error.format());
    return null;
  }
  return parsed.data;
}

export async function updateCompanyInfo(data: CompanyInfo): Promise<boolean> {
  return writeJsonFile('company/info.json', data);
}

// Team content functions
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const data = await readJsonFile<{ members: TeamMember[] }>('company/team.json');
    if (!data || !data.members) {
      console.error('Invalid team content: data or members is null/undefined');
      return [];
    }
    // Return data without validation for GET requests (only validate on write)
    return data.members;
  } catch (error) {
    console.error('Error in getTeamMembers:', error);
    return [];
  }
}

export async function updateTeamMembers(members: TeamMember[]): Promise<boolean> {
  return writeJsonFile('company/team.json', { members });
}

// Services content functions
export async function getServices(): Promise<Service[]> {
  console.log('[getServices] CONTENT_PATH:', CONTENT_PATH);
  const filePath = path.join(process.cwd(), CONTENT_PATH, 'services/services.json');
  console.log('[getServices] Full file path:', filePath);
  console.log('[getServices] File exists:', fs.existsSync(filePath));
  
  const data = await readJsonFile<{ services: Service[] }>('services/services.json');
  console.log('[getServices] Raw data:', data);
  
  const parsed = servicesPayloadSchema.safeParse(data);
  if (!parsed.success) {
    console.error('Invalid services content', parsed.error.format());
    return [];
  }
  
  console.log('[getServices] Parsed services:', parsed.data.services.length, 'items');
  console.log('[getServices] Service IDs:', parsed.data.services.map(s => s.id));
  
  return parsed.data.services;
}

export async function updateServices(services: Service[]): Promise<boolean> {
  return writeJsonFile('services/services.json', { services });
}

// Portfolio content functions
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const data = await readJsonFile<{ items: PortfolioItem[] }>('portfolio/items.json');
  const parsed = portfolioPayloadSchema.safeParse(data);
  if (!parsed.success) {
    console.error('Invalid portfolio content', parsed.error.format());
    return [];
  }
  return parsed.data.items;
}

export async function updatePortfolioItems(items: PortfolioItem[]): Promise<boolean> {
  return writeJsonFile('portfolio/items.json', { items });
}

// Site configuration functions
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const data = await readJsonFile<SiteConfig>('settings/site-config.json');
  const parsed = siteConfigSchema.safeParse(data);
  if (!parsed.success) {
    console.error('Invalid site config content', parsed.error.format());
    return null;
  }
  return parsed.data;
}

export async function updateSiteConfig(config: SiteConfig): Promise<boolean> {
  return writeJsonFile('settings/site-config.json', config);
}

// Utility functions
export function generateId(prefix: string = 'item'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
}