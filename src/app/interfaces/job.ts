export interface Job {
    job_id: string;
    employer_name: string;
    employer_logo: string;
    employer_website: string
    employer_company_type: string | null
    employer_linkedin: string | null
    job_publisher: string;
    job_employment_type: string; 
    job_employment_types: string[];
    job_employment_type_text: string;
    job_title: string;
    job_apply_link: string;
    job_apply_is_direct:false
    job_apply_quality_score:null
    job_description: string;
    job_is_remote: false;
    job_posted_human_readable: string;
    job_posted_at_timestamp: number;
    job_posted_at_datetime_utc: string;
    job_posted_at: string;
    job_location: string;
    job_city: string;
    job_state: string;
    job_country: string;
    job_latitude: number;
    job_longitude: number
    job_benefits: string[];
    job_google_link: string;
    job_highlights: { Qualifications: string[], Responsibilities: string[] }
  }