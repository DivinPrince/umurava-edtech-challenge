const enum ErrorCode {
    // Access Control Errors
    ACCESS_FORBIDDEN = "ACCESS_FORBIDDEN",
    ACCESS_UNAUTHORIZED = "ACCESS_UNAUTHORIZED",
  
    // Validation and Resource Errors
    VALIDATION_ERROR = "VALIDATION_ERROR",
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  
    // System Errors
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    VERIFICATION_ERROR = "VERIFICATION_ERROR",
  }
  
  export { ErrorCode };