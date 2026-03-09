#!/usr/bin/env python3
"""
Backend API Testing Script for Blog Endpoints
Tests the Blog API endpoints as specified in the review request.
"""

import requests
import json
import sys
from typing import Dict, Any

# Get backend URL from frontend .env
BACKEND_URL = "https://premiumark.preview.emergentagent.com/api"

def test_get_all_blog_posts():
    """Test GET /api/blog - Should return a list of 4 posts"""
    print("\n=== Testing GET /api/blog ===")
    
    try:
        response = requests.get(f"{BACKEND_URL}/blog", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            posts = response.json()
            print(f"Number of posts returned: {len(posts)}")
            
            if len(posts) == 4:
                print("✅ PASS: Returned exactly 4 posts as expected")
                
                # Verify structure of first post
                if posts:
                    first_post = posts[0]
                    required_fields = ['slug', 'title', 'excerpt', 'content', 'category', 'date']
                    missing_fields = [field for field in required_fields if field not in first_post]
                    
                    if not missing_fields:
                        print("✅ PASS: Post structure contains all required fields")
                    else:
                        print(f"❌ FAIL: Missing fields in post structure: {missing_fields}")
                        return False
                        
                    # Show sample post data
                    print(f"Sample post slug: {first_post.get('slug', 'N/A')}")
                    print(f"Sample post title: {first_post.get('title', 'N/A')}")
                    
                return True
            else:
                print(f"❌ FAIL: Expected 4 posts, got {len(posts)}")
                return False
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed with error: {e}")
        return False
    except Exception as e:
        print(f"❌ FAIL: Unexpected error: {e}")
        return False

def test_get_specific_blog_post():
    """Test GET /api/blog/ai-w-marketingu-2025 - Should return the specific post"""
    print("\n=== Testing GET /api/blog/ai-w-marketingu-2025 ===")
    
    try:
        slug = "ai-w-marketingu-2025"
        response = requests.get(f"{BACKEND_URL}/blog/{slug}", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            post = response.json()
            print("✅ PASS: Successfully retrieved specific post")
            
            # Verify it's the correct post
            if post.get('slug') == slug:
                print(f"✅ PASS: Correct post returned (slug: {post['slug']})")
                print(f"Post title: {post.get('title', 'N/A')}")
                
                # Verify required fields
                required_fields = ['slug', 'title', 'excerpt', 'content', 'category', 'date']
                missing_fields = [field for field in required_fields if field not in post]
                
                if not missing_fields:
                    print("✅ PASS: Post contains all required fields")
                    return True
                else:
                    print(f"❌ FAIL: Missing fields: {missing_fields}")
                    return False
            else:
                print(f"❌ FAIL: Wrong post returned. Expected slug '{slug}', got '{post.get('slug', 'N/A')}'")
                return False
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed with error: {e}")
        return False
    except Exception as e:
        print(f"❌ FAIL: Unexpected error: {e}")
        return False

def test_get_nonexistent_blog_post():
    """Test GET /api/blog/non-existent-slug - Should return 404"""
    print("\n=== Testing GET /api/blog/non-existent-slug ===")
    
    try:
        slug = "non-existent-slug"
        response = requests.get(f"{BACKEND_URL}/blog/{slug}", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 404:
            print("✅ PASS: Correctly returned 404 for non-existent post")
            
            # Check if response contains error message
            try:
                error_response = response.json()
                if 'detail' in error_response:
                    print(f"Error message: {error_response['detail']}")
                    print("✅ PASS: Error response contains detail message")
                else:
                    print("⚠️  WARNING: 404 response doesn't contain 'detail' field")
            except:
                print("⚠️  WARNING: 404 response is not valid JSON")
                
            return True
        else:
            print(f"❌ FAIL: Expected status 404, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed with error: {e}")
        return False
    except Exception as e:
        print(f"❌ FAIL: Unexpected error: {e}")
        return False

def main():
    """Run all blog API tests"""
    print("🚀 Starting Blog API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    
    # Test results
    results = []
    
    # Run tests
    results.append(("GET /api/blog", test_get_all_blog_posts()))
    results.append(("GET /api/blog/ai-w-marketingu-2025", test_get_specific_blog_post()))
    results.append(("GET /api/blog/non-existent-slug", test_get_nonexistent_blog_post()))
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print(f"\n💥 {failed} test(s) failed!")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)