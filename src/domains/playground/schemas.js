export const addressDetailsSchema = {
  additionalProperties: false,
  properties: {
    address: {
      maxLength: 255,
      title: "Address",
      type: "string",
      "x-jsf-presentation": {
        inputType: "text",
      },
    },
    address_line_2: {
      description:
        "(Optional) For example, apartment, block, or building number.",
      maxLength: 255,
      title: "Address line 2",
      type: ["string", "null"],
      "x-jsf-presentation": {
        inputType: "text",
      },
    },
    city: {
      maxLength: 255,
      title: "City",
      type: "string",
      "x-jsf-presentation": {
        inputType: "text",
      },
    },
    postal_code: {
      description:
        "Make sure you enter the correct UK postal code format. Eg: KY11 9NN, N1 2NU, LS1 8EQ",
      maxLength: 255,
      pattern: "^([A-Z]{1,2}[0-9][A-Z0-9]?|[BFS]IQQ) ?[0-9][A-Z]{2}$",
      title: "Postal code",
      type: "string",
      "x-jsf-presentation": {
        inputType: "text",
      },
    },
  },
  required: ["address", "city", "postal_code"],
  type: "object",
  "x-jsf-order": ["address", "address_line_2", "city", "postal_code"],
};

export const employmentBasicInformationSchema = {
  additionalProperties: false,
  allOf: [
    {
      else: {
        properties: {
          seniority_date: false,
        },
      },
      if: {
        properties: {
          has_seniority_date: {
            const: "yes",
          },
        },
        required: ["has_seniority_date"],
      },
      then: {
        required: ["seniority_date"],
      },
    },
  ],
  properties: {
    department: {
      properties: {
        id: {
          description: "(Optional) Select a department or create one.",
          oneOf: [
            {
              const: "f0cd40da-8b2d-44ab-a470-fe36edbd4099",
              title: "Cenas",
            },
            {
              const: "c1b7df63-c93f-49f7-9d7f-b3a229e4bfb0",
              title: "Cenasas",
            },
            {
              const: "5376d164-8611-48f5-9999-26be6c3b0b8b",
              title: "Hey",
            },
            {
              const: "9e000c9e-68f3-4d86-862c-54503973117e",
              title: "sdf",
            },
            {
              const: "b4fcc6e4-f77c-4ce1-847d-4c6351ca862b",
              title: "sdg",
            },
            {
              const: "c05ce0e2-e97f-443f-a2b6-d2eef504ae55",
              title: "siodugnb",
            },
            {
              const: null,
            },
          ],
          title: "Department",
          type: ["string", "null"],
          "x-jsf-presentation": {
            creatableOn: "name",
            inputType: "select",
            meta: "departments",
            placeholder: "Search or create a department...",
          },
        },
        name: {
          description:
            "Name of the department to be created if none is selected",
          maxLength: 255,
          title: "Department name",
          type: ["string", "null"],
          "x-jsf-presentation": {
            inputType: "text",
          },
        },
      },
      title: "Department",
      type: ["object", "null"],
      "x-jsf-order": ["id", "name"],
      "x-jsf-presentation": {
        inputType: "fieldset",
      },
    },
    email: {
      description: "This is how the employee will access their account.",
      format: "email",
      maxLength: 255,
      title: "Personal email",
      type: "string",
      "x-jsf-presentation": {
        inputType: "email",
      },
    },
    has_seniority_date: {
      description:
        "If the employee started working for your company before being added to Remote, then select Yes.",
      oneOf: [
        {
          const: "yes",
          title: "Yes",
        },
        {
          const: "no",
          title: "No",
        },
      ],
      title: "Does the employee have a seniority date?",
      type: "string",
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
    job_title: {
      description:
        "We can hire most roles but there are some we cannot support. This includes licensed roles, blue collar workers, and employees with certain C-level job titles.",
      maxLength: 255,
      pattern: "\\S",
      title: "Job title",
      type: "string",
      "x-jsf-presentation": {
        inputType: "text",
      },
    },
    manager: {
      properties: {
        id: {
          description:
            "(Optional) The person who will manage this employee day-to-day on the Remote platform.",
          oneOf: [
            {
              const: "a8a99466-a159-4bef-a9e1-0cb6939542e1",
              title: "Michelll sdassPustomer",
              "x-jsf-presentation": {
                meta: {
                  assigned_roles: [
                    {
                      data_scope: "all",
                      name: "Owner",
                      slug: "c982f8f7-373e-4825-bdbe-c13cb086e64f",
                      type: "owner",
                    },
                  ],
                },
              },
            },
            {
              const: "538a0939-112c-43e8-9a3e-e20d0cd1e7de",
              title: "dgsdg",
              "x-jsf-presentation": {
                meta: {
                  assigned_roles: [
                    {
                      data_scope: "direct_reports",
                      name: "People Manager",
                      slug: "63833283-1da7-4cac-b3dd-45ae64387655",
                      type: "people_manager",
                    },
                  ],
                },
              },
            },
            {
              const: null,
            },
          ],
          title: "Manager",
          type: ["string", "null"],
          "x-jsf-presentation": {
            inputType: "select",
            meta: "team_members",
            placeholder: "Select a manager",
          },
        },
      },
      title: "Manager",
      type: ["object", "null"],
      "x-jsf-order": ["id"],
      "x-jsf-presentation": {
        inputType: "fieldset",
      },
    },
    name: {
      description:
        "Full employee name as it appears on identification document.",
      maxLength: 255,
      pattern: "\\S",
      title: "Full name",
      type: "string",
      "x-jsf-presentation": {
        inputType: "text",
      },
    },
    provisional_start_date: {
      description:
        "The minimum onboarding time for United kingdom (uk) is 20 working days. We will confirm the start date once you invite the employee to do the self-enrollnment.",
      format: "date",
      maxLength: 255,
      title: "Provisional start date",
      type: "string",
      "x-jsf-presentation": {
        inputType: "date",
        meta: {
          mot: 20,
        },
        minDate: "2024-10-30",
      },
    },
    seniority_date: {
      description: "Please indicate if different from contract start date",
      format: "date",
      title: "Seniority date",
      type: ["string", "null"],
      "x-jsf-presentation": {
        inputType: "date",
      },
    },
    tax_job_category: {
      oneOf: [
        {
          const: "operations",
          title: "Operations",
        },
        {
          const: "finance",
          title: "Finance",
        },
        {
          const: "legal",
          title: "Legal/Paralegal",
        },
        {
          const: "engineering_it",
          title: "Engineering/IT",
        },
        {
          const: "growth_marketing",
          title: "Growth & Marketing",
        },
        {
          const: "sales",
          title: "Sales",
        },
        {
          const: "customer_experience_support",
          title: "Customer Experience/Support",
        },
        {
          const: "people_mobility",
          title: "People and mobility",
        },
        {
          const: "techops_supply_chain",
          title: "Techops/Supply Chain",
        },
        {
          const: "business_process_improvement_product_management",
          title: "Business Process Improvement / Product Management",
        },
        {
          const: "research_development",
          title: "Research & Development",
        },
      ],
      title: "What is the main job category that the employee performs?",
      type: ["string", "null"],
      "x-jsf-presentation": {
        inputType: "select",
      },
    },
    tax_servicing_countries: {
      items: {
        enum: [
          null,
          "Åland Islands",
          "Zimbabwe",
          "Zambia",
          "Yemen",
          "Western Sahara",
          "Wallis and Futuna Islands",
          "Vietnam",
          "Venezuela",
          "Vatican City (Holy See)",
          "Vanuatu",
          "Uzbekistan",
          "Uruguay",
          "United States Minor Outlying Islands",
          "United States",
          "United Kingdom (UK)",
          "United Arab Emirates (UAE)",
          "Ukraine",
          "Uganda",
          "U.S. Virgin Islands",
          "Tuvalu",
          "Turks and Caicos Islands",
          "Turkmenistan",
          "Turkey",
          "Tunisia",
          "Trinidad and Tobago",
          "Tonga",
          "Tokelau",
          "Togo",
          "Timor-Leste",
          "Thailand",
          "Tanzania",
          "Tajikistan",
          "Taiwan",
          "Syrian Arab Republic",
          "Switzerland",
          "Sweden",
          "Swaziland",
          "Svalbard and Jan Mayen",
          "Suriname",
          "Sudan",
          "Sri Lanka",
          "Spain",
          "South Sudan",
          "South Korea",
          "South Georgia and the South Sandwich Islands",
          "South Africa",
          "Somalia",
          "Solomon Islands",
          "Slovenia",
          "Slovakia",
          "Sint Maarten (Dutch part)",
          "Singapore",
          "Sierra Leone",
          "Seychelles",
          "Serbia",
          "Senegal",
          "Saudi Arabia",
          "Sao Tome and Principe",
          "San Marino",
          "Samoa",
          "Saint Vincent and the Grenadines",
          "Saint Pierre and Miquelon",
          "Saint Martin (French part)",
          "Saint Lucia",
          "Saint Kitts and Nevis",
          "Saint Helena",
          "Saint Barthélemy",
          "Réunion",
          "Rwanda",
          "Russia",
          "Romania",
          "Republic of the Congo",
          "Qatar",
          "Puerto Rico",
          "Portugal",
          "Poland",
          "Pitcairn",
          "Philippines",
          "Peru",
          "Paraguay",
          "Papua New Guinea",
          "Panama",
          "Palestine",
          "Palau",
          "Pakistan",
          "Oman",
          "Norway",
          "Northern Mariana Islands",
          "North Macedonia",
          "Norfolk Island",
          "Niue",
          "Nigeria",
          "Niger",
          "Nicaragua",
          "New Zealand",
          "New Caledonia",
          "Netherlands",
          "Nepal",
          "Nauru",
          "Namibia",
          "Myanmar (Burma)",
          "Mozambique",
          "Morocco",
          "Montserrat",
          "Montenegro",
          "Mongolia",
          "Monaco",
          "Moldova",
          "Micronesia",
          "Mexico",
          "Mayotte",
          "Mauritius",
          "Mauritania",
          "Martinique",
          "Marshall Islands",
          "Malta",
          "Mali",
          "Maldives",
          "Malaysia",
          "Malawi",
          "Madagascar",
          "Macao",
          "Luxembourg",
          "Lithuania",
          "Liechtenstein",
          "Libya",
          "Liberia",
          "Lesotho",
          "Lebanon",
          "Latvia",
          "Laos",
          "Kyrgyzstan",
          "Kuwait",
          "Kosovo",
          "Korea, Democratic People's Republic of",
          "Kiribati",
          "Kenya",
          "Kazakhstan",
          "Jordan",
          "Jersey",
          "Japan",
          "Jamaica",
          "Italy",
          "Israel",
          "Isle of Man",
          "Ireland",
          "Iraq",
          "Iran, Islamic Republic of",
          "Indonesia",
          "India",
          "Iceland",
          "Hungary",
          "Hong Kong",
          "Honduras",
          "Heard Island and McDonald Islands",
          "Haiti",
          "Guyana",
          "Guinea-Bissau",
          "Guinea",
          "Guernsey",
          "Guatemala",
          "Guam",
          "Guadeloupe",
          "Grenada",
          "Greenland",
          "Greece",
          "Gibraltar",
          "Ghana",
          "Germany",
          "Georgia",
          "Gambia",
          "Gabon",
          "French Southern Territories",
          "French Polynesia",
          "French Guiana",
          "France",
          "Finland",
          "Fiji",
          "Faroe Islands",
          "Falkland Islands (Malvinas)",
          "Ethiopia",
          "Estonia",
          "Eritrea",
          "Equatorial Guinea",
          "El Salvador",
          "Egypt",
          "Ecuador",
          "Dominican Republic",
          "Dominica",
          "Djibouti",
          "Denmark",
          "Democratic Republic of the Congo",
          "Czech Republic",
          "Cyprus",
          "Curacao",
          "Cuba",
          "Croatia",
          "Cote d'Ivoire",
          "Costa Rica",
          "Cook Islands",
          "Comoros",
          "Colombia",
          "Cocos (Keeling) Islands",
          "Christmas Island",
          "China",
          "Chile",
          "Chad",
          "Central African Republic (CAR)",
          "Cayman Islands",
          "Canada",
          "Cameroon",
          "Cambodia",
          "Cabo Verde",
          "Burundi",
          "Burkina Faso",
          "Bulgaria",
          "Brunei",
          "British Virgin Islands",
          "British Indian Ocean Territory",
          "Brazil",
          "Bouvet Island",
          "Botswana",
          "Bosnia and Herzegovina",
          "Bonaire, Sint Eustatius and Saba",
          "Bolivia",
          "Bhutan",
          "Bermuda",
          "Benin",
          "Belize",
          "Belgium",
          "Belarus",
          "Barbados",
          "Bangladesh",
          "Bahrain",
          "Bahamas",
          "Azerbaijan",
          "Austria",
          "Australia",
          "Aruba",
          "Armenia",
          "Argentina",
          "Antigua and Barbuda",
          "Antarctica",
          "Anguilla",
          "Angola",
          "Andorra",
          "American Samoa",
          "Algeria",
          "Albania",
          "Afghanistan",
        ],
      },
      title: "What region(s) is the employee working for?",
      type: ["array", "null"],
      uniqueItems: true,
      "x-jsf-presentation": {
        $meta: {
          regions: {
            Africa: [
              "Algeria",
              "Angola",
              "Benin",
              "Botswana",
              "British Indian Ocean Territory",
              "Burkina Faso",
              "Burundi",
              "Cabo Verde",
              "Cameroon",
              "Central African Republic (CAR)",
              "Chad",
              "Comoros",
              "Cote d'Ivoire",
              "Democratic Republic of the Congo",
              "Djibouti",
              "Egypt",
              "Equatorial Guinea",
              "Eritrea",
              "Ethiopia",
              "French Southern Territories",
              "Gabon",
              "Gambia",
              "Ghana",
              "Guinea",
              "Guinea-Bissau",
              "Kenya",
              "Lesotho",
              "Liberia",
              "Libya",
              "Madagascar",
              "Malawi",
              "Mali",
              "Mauritania",
              "Mauritius",
              "Mayotte",
              "Morocco",
              "Mozambique",
              "Namibia",
              "Niger",
              "Nigeria",
              "Republic of the Congo",
              "Rwanda",
              "Réunion",
              "Saint Helena",
              "Sao Tome and Principe",
              "Senegal",
              "Seychelles",
              "Sierra Leone",
              "Somalia",
              "South Africa",
              "South Sudan",
              "Sudan",
              "Swaziland",
              "Tanzania",
              "Togo",
              "Tunisia",
              "Uganda",
              "Western Sahara",
              "Zambia",
              "Zimbabwe",
            ],
            Americas: [
              "Anguilla",
              "Antigua and Barbuda",
              "Argentina",
              "Aruba",
              "Bahamas",
              "Barbados",
              "Belize",
              "Bermuda",
              "Bolivia",
              "Bonaire, Sint Eustatius and Saba",
              "Bouvet Island",
              "Brazil",
              "British Virgin Islands",
              "Canada",
              "Cayman Islands",
              "Chile",
              "Colombia",
              "Costa Rica",
              "Cuba",
              "Curacao",
              "Dominica",
              "Dominican Republic",
              "Ecuador",
              "El Salvador",
              "Falkland Islands (Malvinas)",
              "French Guiana",
              "Greenland",
              "Grenada",
              "Guadeloupe",
              "Guatemala",
              "Guyana",
              "Haiti",
              "Honduras",
              "Jamaica",
              "Martinique",
              "Mexico",
              "Montserrat",
              "Nicaragua",
              "Panama",
              "Paraguay",
              "Peru",
              "Puerto Rico",
              "Saint Barthélemy",
              "Saint Kitts and Nevis",
              "Saint Lucia",
              "Saint Martin (French part)",
              "Saint Pierre and Miquelon",
              "Saint Vincent and the Grenadines",
              "Sint Maarten (Dutch part)",
              "South Georgia and the South Sandwich Islands",
              "Suriname",
              "Trinidad and Tobago",
              "Turks and Caicos Islands",
              "U.S. Virgin Islands",
              "United States",
              "Uruguay",
              "Venezuela",
            ],
            Antarctica: ["Antarctica"],
            Asia: [
              "Afghanistan",
              "Armenia",
              "Azerbaijan",
              "Bahrain",
              "Bangladesh",
              "Bhutan",
              "Brunei",
              "Cambodia",
              "China",
              "Cyprus",
              "Georgia",
              "Hong Kong",
              "India",
              "Indonesia",
              "Iran, Islamic Republic of",
              "Iraq",
              "Israel",
              "Japan",
              "Jordan",
              "Kazakhstan",
              "Korea, Democratic People's Republic of",
              "Kuwait",
              "Kyrgyzstan",
              "Laos",
              "Lebanon",
              "Macao",
              "Malaysia",
              "Maldives",
              "Mongolia",
              "Myanmar (Burma)",
              "Nepal",
              "Oman",
              "Pakistan",
              "Palestine",
              "Philippines",
              "Qatar",
              "Saudi Arabia",
              "Singapore",
              "South Korea",
              "Sri Lanka",
              "Syrian Arab Republic",
              "Taiwan",
              "Tajikistan",
              "Thailand",
              "Timor-Leste",
              "Turkey",
              "Turkmenistan",
              "United Arab Emirates (UAE)",
              "Uzbekistan",
              "Vietnam",
              "Yemen",
            ],
            Europe: [
              "Albania",
              "Andorra",
              "Austria",
              "Belarus",
              "Belgium",
              "Bosnia and Herzegovina",
              "Bulgaria",
              "Croatia",
              "Czech Republic",
              "Denmark",
              "Estonia",
              "Faroe Islands",
              "Finland",
              "France",
              "Germany",
              "Gibraltar",
              "Greece",
              "Guernsey",
              "Hungary",
              "Iceland",
              "Ireland",
              "Isle of Man",
              "Italy",
              "Jersey",
              "Kosovo",
              "Latvia",
              "Liechtenstein",
              "Lithuania",
              "Luxembourg",
              "Malta",
              "Moldova",
              "Monaco",
              "Montenegro",
              "Netherlands",
              "North Macedonia",
              "Norway",
              "Poland",
              "Portugal",
              "Romania",
              "Russia",
              "San Marino",
              "Serbia",
              "Slovakia",
              "Slovenia",
              "Spain",
              "Svalbard and Jan Mayen",
              "Sweden",
              "Switzerland",
              "Ukraine",
              "United Kingdom (UK)",
              "Vatican City (Holy See)",
              "Åland Islands",
            ],
            Oceania: [
              "American Samoa",
              "Australia",
              "Christmas Island",
              "Cocos (Keeling) Islands",
              "Cook Islands",
              "Fiji",
              "French Polynesia",
              "Guam",
              "Heard Island and McDonald Islands",
              "Kiribati",
              "Marshall Islands",
              "Micronesia",
              "Nauru",
              "New Caledonia",
              "New Zealand",
              "Niue",
              "Norfolk Island",
              "Northern Mariana Islands",
              "Palau",
              "Papua New Guinea",
              "Pitcairn",
              "Samoa",
              "Solomon Islands",
              "Tokelau",
              "Tonga",
              "Tuvalu",
              "United States Minor Outlying Islands",
              "Vanuatu",
              "Wallis and Futuna Islands",
            ],
          },
          subregions: {
            Antarctica: ["Antarctica"],
            "Australia and New Zealand": [
              "Australia",
              "Christmas Island",
              "Cocos (Keeling) Islands",
              "Heard Island and McDonald Islands",
              "New Zealand",
              "Norfolk Island",
            ],
            Caribbean: [
              "Anguilla",
              "Antigua and Barbuda",
              "Bahamas",
              "Barbados",
              "Bonaire, Sint Eustatius and Saba",
              "Bouvet Island",
              "British Virgin Islands",
              "Cayman Islands",
              "Curacao",
              "Dominica",
              "Grenada",
              "Guadeloupe",
              "Jamaica",
              "Martinique",
              "Montserrat",
              "Puerto Rico",
              "Saint Barthélemy",
              "Saint Kitts and Nevis",
              "Saint Lucia",
              "Saint Martin (French part)",
              "Saint Vincent and the Grenadines",
              "Sint Maarten (Dutch part)",
              "Turks and Caicos Islands",
              "U.S. Virgin Islands",
            ],
            "Central Asia": [
              "Kazakhstan",
              "Kyrgyzstan",
              "Tajikistan",
              "Turkmenistan",
              "Uzbekistan",
            ],
            "Eastern Asia": [
              "China",
              "Hong Kong",
              "Japan",
              "Korea, Democratic People's Republic of",
              "Macao",
              "Mongolia",
              "South Korea",
              "Taiwan",
            ],
            "Eastern Europe": [
              "Belarus",
              "Bulgaria",
              "Czech Republic",
              "Hungary",
              "Moldova",
              "Poland",
              "Romania",
              "Russia",
              "Slovakia",
              "Ukraine",
            ],
            "Latin America": [
              "Argentina",
              "Aruba",
              "Belize",
              "Bolivia",
              "Brazil",
              "Chile",
              "Colombia",
              "Costa Rica",
              "Cuba",
              "Dominican Republic",
              "Ecuador",
              "El Salvador",
              "Falkland Islands (Malvinas)",
              "French Guiana",
              "Guatemala",
              "Guyana",
              "Haiti",
              "Honduras",
              "Mexico",
              "Nicaragua",
              "Panama",
              "Paraguay",
              "Peru",
              "South Georgia and the South Sandwich Islands",
              "Suriname",
              "Trinidad and Tobago",
              "Uruguay",
              "Venezuela",
            ],
            Melanesia: [
              "Fiji",
              "New Caledonia",
              "Papua New Guinea",
              "Solomon Islands",
              "Vanuatu",
            ],
            Micronesia: [
              "Guam",
              "Kiribati",
              "Marshall Islands",
              "Micronesia",
              "Nauru",
              "Northern Mariana Islands",
              "Palau",
              "United States Minor Outlying Islands",
            ],
            "Northern Africa": [
              "Algeria",
              "Egypt",
              "Libya",
              "Morocco",
              "Sudan",
              "Tunisia",
              "Western Sahara",
            ],
            "Northern America": [
              "Bermuda",
              "Canada",
              "Greenland",
              "Saint Pierre and Miquelon",
              "United States",
            ],
            "Northern Europe": [
              "Denmark",
              "Estonia",
              "Faroe Islands",
              "Finland",
              "Guernsey",
              "Iceland",
              "Ireland",
              "Isle of Man",
              "Jersey",
              "Latvia",
              "Lithuania",
              "Norway",
              "Svalbard and Jan Mayen",
              "Sweden",
              "United Kingdom (UK)",
              "Åland Islands",
            ],
            Polynesia: [
              "American Samoa",
              "Cook Islands",
              "French Polynesia",
              "Niue",
              "Pitcairn",
              "Samoa",
              "Tokelau",
              "Tonga",
              "Tuvalu",
              "Wallis and Futuna Islands",
            ],
            "South-eastern Asia": [
              "Brunei",
              "Cambodia",
              "Indonesia",
              "Laos",
              "Malaysia",
              "Myanmar (Burma)",
              "Philippines",
              "Singapore",
              "Thailand",
              "Timor-Leste",
              "Vietnam",
            ],
            "Southern Asia": [
              "Afghanistan",
              "Bangladesh",
              "Bhutan",
              "India",
              "Iran, Islamic Republic of",
              "Maldives",
              "Nepal",
              "Pakistan",
              "Sri Lanka",
            ],
            "Southern Europe": [
              "Albania",
              "Andorra",
              "Bosnia and Herzegovina",
              "Croatia",
              "Gibraltar",
              "Greece",
              "Italy",
              "Malta",
              "Montenegro",
              "North Macedonia",
              "Portugal",
              "San Marino",
              "Serbia",
              "Slovenia",
              "Spain",
              "Vatican City (Holy See)",
            ],
            "Sub-Saharan Africa": [
              "Angola",
              "Benin",
              "Botswana",
              "British Indian Ocean Territory",
              "Burkina Faso",
              "Burundi",
              "Cabo Verde",
              "Cameroon",
              "Central African Republic (CAR)",
              "Chad",
              "Comoros",
              "Cote d'Ivoire",
              "Democratic Republic of the Congo",
              "Djibouti",
              "Equatorial Guinea",
              "Eritrea",
              "Ethiopia",
              "French Southern Territories",
              "Gabon",
              "Gambia",
              "Ghana",
              "Guinea",
              "Guinea-Bissau",
              "Kenya",
              "Lesotho",
              "Liberia",
              "Madagascar",
              "Malawi",
              "Mali",
              "Mauritania",
              "Mauritius",
              "Mayotte",
              "Mozambique",
              "Namibia",
              "Niger",
              "Nigeria",
              "Republic of the Congo",
              "Rwanda",
              "Réunion",
              "Saint Helena",
              "Sao Tome and Principe",
              "Senegal",
              "Seychelles",
              "Sierra Leone",
              "Somalia",
              "South Africa",
              "South Sudan",
              "Swaziland",
              "Tanzania",
              "Togo",
              "Uganda",
              "Zambia",
              "Zimbabwe",
            ],
            "Western Asia": [
              "Armenia",
              "Azerbaijan",
              "Bahrain",
              "Cyprus",
              "Georgia",
              "Iraq",
              "Israel",
              "Jordan",
              "Kuwait",
              "Lebanon",
              "Oman",
              "Palestine",
              "Qatar",
              "Saudi Arabia",
              "Syrian Arab Republic",
              "Turkey",
              "United Arab Emirates (UAE)",
              "Yemen",
            ],
            "Western Europe": [
              "Austria",
              "Belgium",
              "France",
              "Germany",
              "Liechtenstein",
              "Luxembourg",
              "Monaco",
              "Netherlands",
              "Switzerland",
            ],
          },
        },
        inputType: "countries",
        options: [
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Afghanistan",
            value: "Afghanistan",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Albania",
            value: "Albania",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Northern Africa",
            },
            label: "Algeria",
            value: "Algeria",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "American Samoa",
            value: "American Samoa",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Andorra",
            value: "Andorra",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Angola",
            value: "Angola",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Anguilla",
            value: "Anguilla",
          },
          {
            $meta: {
              region: "Antarctica",
              subregion: "Antarctica",
            },
            label: "Antarctica",
            value: "Antarctica",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Antigua and Barbuda",
            value: "Antigua and Barbuda",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Argentina",
            value: "Argentina",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Armenia",
            value: "Armenia",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Aruba",
            value: "Aruba",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Australia and New Zealand",
            },
            label: "Australia",
            value: "Australia",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Austria",
            value: "Austria",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Azerbaijan",
            value: "Azerbaijan",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Bahamas",
            value: "Bahamas",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Bahrain",
            value: "Bahrain",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Bangladesh",
            value: "Bangladesh",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Barbados",
            value: "Barbados",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Belarus",
            value: "Belarus",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Belgium",
            value: "Belgium",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Belize",
            value: "Belize",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Benin",
            value: "Benin",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Northern America",
            },
            label: "Bermuda",
            value: "Bermuda",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Bhutan",
            value: "Bhutan",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Bolivia",
            value: "Bolivia",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Bonaire, Sint Eustatius and Saba",
            value: "Bonaire, Sint Eustatius and Saba",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Bosnia and Herzegovina",
            value: "Bosnia and Herzegovina",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Botswana",
            value: "Botswana",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Bouvet Island",
            value: "Bouvet Island",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Brazil",
            value: "Brazil",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "British Indian Ocean Territory",
            value: "British Indian Ocean Territory",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "British Virgin Islands",
            value: "British Virgin Islands",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Brunei",
            value: "Brunei",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Bulgaria",
            value: "Bulgaria",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Burkina Faso",
            value: "Burkina Faso",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Burundi",
            value: "Burundi",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Cabo Verde",
            value: "Cabo Verde",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Cambodia",
            value: "Cambodia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Cameroon",
            value: "Cameroon",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Northern America",
            },
            label: "Canada",
            value: "Canada",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Cayman Islands",
            value: "Cayman Islands",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Central African Republic (CAR)",
            value: "Central African Republic (CAR)",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Chad",
            value: "Chad",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Chile",
            value: "Chile",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "China",
            value: "China",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Australia and New Zealand",
            },
            label: "Christmas Island",
            value: "Christmas Island",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Australia and New Zealand",
            },
            label: "Cocos (Keeling) Islands",
            value: "Cocos (Keeling) Islands",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Colombia",
            value: "Colombia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Comoros",
            value: "Comoros",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Cook Islands",
            value: "Cook Islands",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Costa Rica",
            value: "Costa Rica",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Cote d'Ivoire",
            value: "Cote d'Ivoire",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Croatia",
            value: "Croatia",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Cuba",
            value: "Cuba",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Curacao",
            value: "Curacao",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Cyprus",
            value: "Cyprus",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Czech Republic",
            value: "Czech Republic",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Democratic Republic of the Congo",
            value: "Democratic Republic of the Congo",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Denmark",
            value: "Denmark",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Djibouti",
            value: "Djibouti",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Dominica",
            value: "Dominica",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Dominican Republic",
            value: "Dominican Republic",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Ecuador",
            value: "Ecuador",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Northern Africa",
            },
            label: "Egypt",
            value: "Egypt",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "El Salvador",
            value: "El Salvador",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Equatorial Guinea",
            value: "Equatorial Guinea",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Eritrea",
            value: "Eritrea",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Estonia",
            value: "Estonia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Ethiopia",
            value: "Ethiopia",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Falkland Islands (Malvinas)",
            value: "Falkland Islands (Malvinas)",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Faroe Islands",
            value: "Faroe Islands",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Melanesia",
            },
            label: "Fiji",
            value: "Fiji",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Finland",
            value: "Finland",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "France",
            value: "France",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "French Guiana",
            value: "French Guiana",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "French Polynesia",
            value: "French Polynesia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "French Southern Territories",
            value: "French Southern Territories",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Gabon",
            value: "Gabon",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Gambia",
            value: "Gambia",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Georgia",
            value: "Georgia",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Germany",
            value: "Germany",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Ghana",
            value: "Ghana",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Gibraltar",
            value: "Gibraltar",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Greece",
            value: "Greece",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Northern America",
            },
            label: "Greenland",
            value: "Greenland",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Grenada",
            value: "Grenada",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Guadeloupe",
            value: "Guadeloupe",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "Guam",
            value: "Guam",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Guatemala",
            value: "Guatemala",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Guernsey",
            value: "Guernsey",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Guinea",
            value: "Guinea",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Guinea-Bissau",
            value: "Guinea-Bissau",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Guyana",
            value: "Guyana",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Haiti",
            value: "Haiti",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Australia and New Zealand",
            },
            label: "Heard Island and McDonald Islands",
            value: "Heard Island and McDonald Islands",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Honduras",
            value: "Honduras",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "Hong Kong",
            value: "Hong Kong",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Hungary",
            value: "Hungary",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Iceland",
            value: "Iceland",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "India",
            value: "India",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Indonesia",
            value: "Indonesia",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Iran, Islamic Republic of",
            value: "Iran, Islamic Republic of",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Iraq",
            value: "Iraq",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Ireland",
            value: "Ireland",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Isle of Man",
            value: "Isle of Man",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Israel",
            value: "Israel",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Italy",
            value: "Italy",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Jamaica",
            value: "Jamaica",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "Japan",
            value: "Japan",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Jersey",
            value: "Jersey",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Jordan",
            value: "Jordan",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Central Asia",
            },
            label: "Kazakhstan",
            value: "Kazakhstan",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Kenya",
            value: "Kenya",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "Kiribati",
            value: "Kiribati",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "Korea, Democratic People's Republic of",
            value: "Korea, Democratic People's Republic of",
          },
          {
            $meta: {
              region: "Europe",
              subregion: null,
            },
            label: "Kosovo",
            value: "Kosovo",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Kuwait",
            value: "Kuwait",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Central Asia",
            },
            label: "Kyrgyzstan",
            value: "Kyrgyzstan",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Laos",
            value: "Laos",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Latvia",
            value: "Latvia",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Lebanon",
            value: "Lebanon",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Lesotho",
            value: "Lesotho",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Liberia",
            value: "Liberia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Northern Africa",
            },
            label: "Libya",
            value: "Libya",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Liechtenstein",
            value: "Liechtenstein",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Lithuania",
            value: "Lithuania",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Luxembourg",
            value: "Luxembourg",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "Macao",
            value: "Macao",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Madagascar",
            value: "Madagascar",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Malawi",
            value: "Malawi",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Malaysia",
            value: "Malaysia",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Maldives",
            value: "Maldives",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Mali",
            value: "Mali",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Malta",
            value: "Malta",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "Marshall Islands",
            value: "Marshall Islands",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Martinique",
            value: "Martinique",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Mauritania",
            value: "Mauritania",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Mauritius",
            value: "Mauritius",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Mayotte",
            value: "Mayotte",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Mexico",
            value: "Mexico",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "Micronesia",
            value: "Micronesia",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Moldova",
            value: "Moldova",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Monaco",
            value: "Monaco",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "Mongolia",
            value: "Mongolia",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Montenegro",
            value: "Montenegro",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Montserrat",
            value: "Montserrat",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Northern Africa",
            },
            label: "Morocco",
            value: "Morocco",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Mozambique",
            value: "Mozambique",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Myanmar (Burma)",
            value: "Myanmar (Burma)",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Namibia",
            value: "Namibia",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "Nauru",
            value: "Nauru",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Nepal",
            value: "Nepal",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Netherlands",
            value: "Netherlands",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Melanesia",
            },
            label: "New Caledonia",
            value: "New Caledonia",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Australia and New Zealand",
            },
            label: "New Zealand",
            value: "New Zealand",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Nicaragua",
            value: "Nicaragua",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Niger",
            value: "Niger",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Nigeria",
            value: "Nigeria",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Niue",
            value: "Niue",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Australia and New Zealand",
            },
            label: "Norfolk Island",
            value: "Norfolk Island",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "North Macedonia",
            value: "North Macedonia",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "Northern Mariana Islands",
            value: "Northern Mariana Islands",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Norway",
            value: "Norway",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Oman",
            value: "Oman",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Pakistan",
            value: "Pakistan",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "Palau",
            value: "Palau",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Palestine",
            value: "Palestine",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Panama",
            value: "Panama",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Melanesia",
            },
            label: "Papua New Guinea",
            value: "Papua New Guinea",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Paraguay",
            value: "Paraguay",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Peru",
            value: "Peru",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Philippines",
            value: "Philippines",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Pitcairn",
            value: "Pitcairn",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Poland",
            value: "Poland",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Portugal",
            value: "Portugal",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Puerto Rico",
            value: "Puerto Rico",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Qatar",
            value: "Qatar",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Republic of the Congo",
            value: "Republic of the Congo",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Romania",
            value: "Romania",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Russia",
            value: "Russia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Rwanda",
            value: "Rwanda",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Réunion",
            value: "Réunion",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Saint Barthélemy",
            value: "Saint Barthélemy",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Saint Helena",
            value: "Saint Helena",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Saint Kitts and Nevis",
            value: "Saint Kitts and Nevis",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Saint Lucia",
            value: "Saint Lucia",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Saint Martin (French part)",
            value: "Saint Martin (French part)",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Northern America",
            },
            label: "Saint Pierre and Miquelon",
            value: "Saint Pierre and Miquelon",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Saint Vincent and the Grenadines",
            value: "Saint Vincent and the Grenadines",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Samoa",
            value: "Samoa",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "San Marino",
            value: "San Marino",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Sao Tome and Principe",
            value: "Sao Tome and Principe",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Saudi Arabia",
            value: "Saudi Arabia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Senegal",
            value: "Senegal",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Serbia",
            value: "Serbia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Seychelles",
            value: "Seychelles",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Sierra Leone",
            value: "Sierra Leone",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Singapore",
            value: "Singapore",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Sint Maarten (Dutch part)",
            value: "Sint Maarten (Dutch part)",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Slovakia",
            value: "Slovakia",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Slovenia",
            value: "Slovenia",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Melanesia",
            },
            label: "Solomon Islands",
            value: "Solomon Islands",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Somalia",
            value: "Somalia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "South Africa",
            value: "South Africa",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "South Georgia and the South Sandwich Islands",
            value: "South Georgia and the South Sandwich Islands",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "South Korea",
            value: "South Korea",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "South Sudan",
            value: "South Sudan",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Spain",
            value: "Spain",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Southern Asia",
            },
            label: "Sri Lanka",
            value: "Sri Lanka",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Northern Africa",
            },
            label: "Sudan",
            value: "Sudan",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Suriname",
            value: "Suriname",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Svalbard and Jan Mayen",
            value: "Svalbard and Jan Mayen",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Swaziland",
            value: "Swaziland",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Sweden",
            value: "Sweden",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Western Europe",
            },
            label: "Switzerland",
            value: "Switzerland",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Syrian Arab Republic",
            value: "Syrian Arab Republic",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Eastern Asia",
            },
            label: "Taiwan",
            value: "Taiwan",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Central Asia",
            },
            label: "Tajikistan",
            value: "Tajikistan",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Tanzania",
            value: "Tanzania",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Thailand",
            value: "Thailand",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Timor-Leste",
            value: "Timor-Leste",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Togo",
            value: "Togo",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Tokelau",
            value: "Tokelau",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Tonga",
            value: "Tonga",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Trinidad and Tobago",
            value: "Trinidad and Tobago",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Northern Africa",
            },
            label: "Tunisia",
            value: "Tunisia",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Turkey",
            value: "Turkey",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Central Asia",
            },
            label: "Turkmenistan",
            value: "Turkmenistan",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "Turks and Caicos Islands",
            value: "Turks and Caicos Islands",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Tuvalu",
            value: "Tuvalu",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Caribbean",
            },
            label: "U.S. Virgin Islands",
            value: "U.S. Virgin Islands",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Uganda",
            value: "Uganda",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Eastern Europe",
            },
            label: "Ukraine",
            value: "Ukraine",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "United Arab Emirates (UAE)",
            value: "United Arab Emirates (UAE)",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "United Kingdom (UK)",
            value: "United Kingdom (UK)",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Northern America",
            },
            label: "United States",
            value: "United States",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Micronesia",
            },
            label: "United States Minor Outlying Islands",
            value: "United States Minor Outlying Islands",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Uruguay",
            value: "Uruguay",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Central Asia",
            },
            label: "Uzbekistan",
            value: "Uzbekistan",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Melanesia",
            },
            label: "Vanuatu",
            value: "Vanuatu",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Southern Europe",
            },
            label: "Vatican City (Holy See)",
            value: "Vatican City (Holy See)",
          },
          {
            $meta: {
              region: "Americas",
              subregion: "Latin America",
            },
            label: "Venezuela",
            value: "Venezuela",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "South-eastern Asia",
            },
            label: "Vietnam",
            value: "Vietnam",
          },
          {
            $meta: {
              region: "Oceania",
              subregion: "Polynesia",
            },
            label: "Wallis and Futuna Islands",
            value: "Wallis and Futuna Islands",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Northern Africa",
            },
            label: "Western Sahara",
            value: "Western Sahara",
          },
          {
            $meta: {
              region: "Asia",
              subregion: "Western Asia",
            },
            label: "Yemen",
            value: "Yemen",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Zambia",
            value: "Zambia",
          },
          {
            $meta: {
              region: "Africa",
              subregion: "Sub-Saharan Africa",
            },
            label: "Zimbabwe",
            value: "Zimbabwe",
          },
          {
            $meta: {
              region: "Europe",
              subregion: "Northern Europe",
            },
            label: "Åland Islands",
            value: "Åland Islands",
          },
        ],
        placeholder: "Country",
      },
    },
    work_email: {
      description:
        "The employee's company email. For example, jane@company.com.",
      format: "email",
      maxLength: 255,
      title: "Work email",
      type: "string",
      "x-jsf-presentation": {
        inputType: "email",
      },
    },
  },
  required: [
    "name",
    "email",
    "job_title",
    "provisional_start_date",
    "has_seniority_date",
  ],
  type: "object",
  "x-jsf-order": [
    "name",
    "email",
    "work_email",
    "job_title",
    "tax_servicing_countries",
    "tax_job_category",
    "department",
    "provisional_start_date",
    "has_seniority_date",
    "seniority_date",
    "manager",
  ],
};

export const contractDetailsSchema = {
  additionalProperties: false,
  allOf: [
    {
      else: {
        properties: {
          contract_end_date: false,
        },
      },
      if: {
        properties: {
          contract_duration_type: {
            const: "fixed_term",
          },
        },
        required: ["contract_duration_type"],
      },
      then: {
        properties: {
          contract_end_date: {
            type: ["string"],
          },
        },
        required: ["contract_end_date"],
      },
    },
    {
      else: {
        properties: {
          bonus_amount: false,
          bonus_details: false,
        },
      },
      if: {
        properties: {
          has_bonus: {
            const: "yes",
          },
        },
        required: ["has_bonus"],
      },
      then: {
        properties: {
          bonus_details: {
            type: ["string"],
          },
        },
        required: ["bonus_details"],
      },
    },
    {
      else: {
        properties: {
          commissions_ack: false,
          commissions_details: false,
        },
      },
      if: {
        properties: {
          has_commissions: {
            const: "yes",
          },
        },
        required: ["has_commissions"],
      },
      then: {
        properties: {
          commissions_ack: {
            type: ["string"],
          },
          commissions_details: {
            type: ["string"],
          },
        },
        required: ["commissions_details", "commissions_ack"],
      },
    },
    {
      else: {
        properties: {
          signing_bonus_amount: false,
        },
      },
      if: {
        properties: {
          has_signing_bonus: {
            const: "yes",
          },
        },
        required: ["has_signing_bonus"],
      },
      then: {
        properties: {
          signing_bonus_amount: {
            type: ["integer"],
          },
        },
        required: ["signing_bonus_amount"],
      },
    },
    {
      if: {
        properties: {
          work_schedule: {
            const: "part_time",
          },
        },
        required: ["work_schedule"],
      },
      then: {
        properties: {
          available_pto: {
            description:
              "Please note that Statutory, Bank Holidays and Public Holidays in the employee's country of residence are excluded from the above.",
          },
        },
      },
    },
    {
      else: {
        properties: {
          part_time_salary_confirmation: false,
        },
      },
      if: {
        properties: {
          work_schedule: {
            const: "part_time",
          },
        },
        required: ["work_schedule"],
      },
      then: {
        properties: {
          part_time_salary_confirmation: {
            type: "string",
          },
        },
        required: ["part_time_salary_confirmation"],
      },
    },
    {
      if: {
        properties: {
          probation_length: {
            const: 0,
          },
        },
        required: ["probation_length"],
      },
      then: {
        properties: {
          probation_length: {
            "x-jsf-presentation": {
              statement: {
                description:
                  "Waiving the probation period is possible but discouraged",
                severity: "warning",
              },
            },
          },
        },
      },
    },
    {
      else: {
        properties: {
          compensation_currency_code: {
            "x-jsf-presentation": {
              statement: false,
            },
          },
        },
      },
      if: {
        properties: {
          compensation_currency_code: {
            enum: ["USD"],
          },
        },
        required: ["compensation_currency_code"],
      },
      then: {
        properties: {
          compensation_currency_code: {
            "x-jsf-presentation": {
              statement: {
                description:
                  "The employee must have a bank account in USD currency. Please confirm with the employee before completing the contract details.",
                severity: "warning",
                title: "Employee payments will be in a non local currency",
              },
            },
          },
        },
      },
    },
    {
      else: {
        properties: {
          work_hours_per_week: {
            maximum: 48,
            minimum: 35,
            "x-jsf-errorMessage": {
              maximum: "Must be no more than 48 hours per week.",
              minimum: "Must be at least 35 hour per week.",
            },
          },
        },
      },
      if: {
        properties: {
          work_schedule: {
            const: "part_time",
          },
        },
        required: ["work_schedule"],
      },
      then: {
        properties: {
          work_hours_per_week: {
            maximum: 34,
            minimum: 1,
            "x-jsf-errorMessage": {
              maximum: "Must be no more than 34 hours per week.",
              minimum: "Must be at least 1 hour per week.",
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          compensation_currency_code: {
            enum: ["GBP"],
          },
          work_schedule: {
            const: "full_time",
          },
        },
        required: ["work_schedule", "compensation_currency_code"],
      },
      then: {
        properties: {
          annual_gross_salary: {
            minimum: 1621620,
            "x-jsf-errorMessage": {
              minimum:
                "£16,216.20 is the national minimum wage applicable for those aged 23 and older. In case the employee is aged under 23, the minimum wage will be lower. We reserve the right to increase the employee’s wage to adhere to the applicable laws. In case you have any doubts, please reach out so we can help you set the correct salary.",
            },
          },
        },
      },
    },
    {
      else: {
        else: {
          properties: {
            available_pto: {
              description:
                "In the United Kingdom, employees are entitled to a minimum of 20 paid time off days per year, which are pro-rated in the first year of employment. Please note that Statutory, Bank Holidays and Public Holidays are excluded from the above.",
              minimum: 20,
            },
          },
        },
        if: {
          properties: {
            work_schedule: {
              const: "part_time",
            },
          },
          required: ["work_schedule"],
        },
        then: {
          properties: {
            available_pto: {
              description:
                "In the United Kingdom, employees are entitled to a minimum of 20 paid time off days per year, which are pro-rated in the first year of employment. For part-time employees, annual leave days are prorated according to the number of days worked. Please note that Statutory, Bank Holidays and Public Holidays are excluded from the above.",
              minimum: 0,
            },
          },
        },
      },
      if: {
        properties: {
          available_pto_type: {
            const: "unlimited",
          },
        },
        required: ["available_pto_type"],
      },
      then: {
        properties: {
          available_pto: {
            const: 20,
            default: 20,
            title: "Minimum paid time off days",
            "x-jsf-presentation": {
              statement: {
                description:
                  "In the United Kingdom, employees are entitled to a minimum of 20 paid time off days per year, which are pro-rated in the first year of employment. Please note that Statutory, Bank Holidays and Public Holidays are excluded from the above.",
                title: "Minimum of <strong>20 days</strong> of paid time off.",
              },
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          compensation_currency_code: {
            const: "USD",
          },
        },
        required: ["compensation_currency_code"],
      },
      then: {
        properties: {
          annual_gross_salary: {
            description: "Annual gross salary in United States Dollars (USD).",
            "x-jsf-presentation": {
              currency: "USD",
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          compensation_currency_code: {
            const: "USD",
          },
          has_signing_bonus: {
            const: "yes",
          },
        },
        required: ["compensation_currency_code", "has_signing_bonus"],
      },
      then: {
        properties: {
          signing_bonus_amount: {
            description: "In United States Dollars (USD).",
            type: "integer",
            "x-jsf-presentation": {
              currency: "USD",
            },
          },
        },
        required: ["signing_bonus_amount"],
      },
    },
    {
      if: {
        properties: {
          compensation_currency_code: {
            const: "USD",
          },
          has_bonus: {
            const: "yes",
          },
        },
        required: ["compensation_currency_code", "has_bonus"],
      },
      then: {
        properties: {
          bonus_amount: {
            description: "In United States Dollars (USD).",
            "x-jsf-presentation": {
              currency: "USD",
            },
          },
        },
      },
    },
  ],
  properties: {
    annual_gross_salary: {
      title: "Annual gross salary",
      type: "integer",
      "x-jsf-errorMessage": {
        type: "Please, use US standard currency format. Ex: 1024.12",
      },
      "x-jsf-presentation": {
        currency: "GBP",
        inputType: "money",
      },
    },
    available_pto: {
      title: "Number of paid time off days",
      type: "number",
      "x-jsf-presentation": {
        inputType: "number",
      },
    },
    available_pto_type: {
      description:
        "For personal time off. Also called vacation or annual leave.",
      oneOf: [
        {
          const: "unlimited",
          description:
            "Gives the employee an uncapped number of paid time off days per year. The number below is the mandatory minimum number of days they must take.",
          title: "Unlimited paid time off",
        },
        {
          const: "fixed",
          description:
            "The employee gets a set number of paid time off days per year that you establish.",
          title: "Fixed paid time off",
        },
        {
          const: null,
          title: "N/A",
        },
      ],
      title: "Paid time off policy",
      type: ["string", "null"],
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
    benefits: {
      additionalProperties: false,
      properties: {
        health_insurance: {
          default: "no",
          oneOf: [
            {
              const: "no",
              title: "I don't want to offer this benefit.",
              "x-jsf-presentation": {
                meta: {
                  types: [],
                },
              },
            },
          ],
          title: "Health Insurance",
          type: "string",
          "x-jsf-presentation": {
            inputType: "radio",
          },
        },
        life_insurance: {
          default:
            "Life, Accidental Death & Permanent Disability - $50k (Allianz Life - Global Life - AD&D 50k; Allianz Life - Global Life - Life 50k; Allianz Life - Global Life - PD 50k)",
          oneOf: [
            {
              const:
                "Life, Accidental Death & Permanent Disability - $50k (Allianz Life - Global Life - AD&D 50k; Allianz Life - Global Life - Life 50k; Allianz Life - Global Life - PD 50k)",
              title:
                "Life, Accidental Death & Permanent Disability - $50k - 12.04 USD/mo",
              "x-jsf-presentation": {
                description:
                  "Covers Life Insurance, Accidental Death & Dismemberment, and Permanent Disability. \nIn the unfortunate event of an employee's demise, their beneficiary will receive a payout equivalent to up to 6 times the employee's annual salary, capped at a maximum of $50,000. In cases of accidental death, dismemberment, or permanent disability, the compensation is equivalent to up to 5 times the employee's annual salary, also with a $50,000 limit. Regardless of the specifics of an incident or an employee's salary, payouts will never exceed $50,000.",
                meta: {
                  detailsUrl:
                    "https://remote.com/benefits-guide/employee-benefits-global-life-comprehensive-50k",
                  displayCost: "12.04 USD/mo",
                  id: "5a2f2b96-bfd9-41af-ba27-1e7498da25af",
                  providerName: "Allianz Life",
                  tierName:
                    "Life, Accidental Death & Permanent Disability - $50k",
                  types: ["ad&d", "life", "disability"],
                },
              },
            },
          ],
          title: "Life Insurance",
          type: "string",
          "x-jsf-presentation": {
            inputType: "radio",
          },
        },
        mental_health_program: {
          default: "no",
          oneOf: [
            {
              const: "no",
              title: "I don't want to offer this benefit.",
              "x-jsf-presentation": {
                meta: {
                  types: ["mental-wellbeing"],
                },
              },
            },
          ],
          title: "Mental Health Program",
          type: "string",
          "x-jsf-presentation": {
            inputType: "radio",
          },
        },
      },
      required: ["mental_health_program", "life_insurance", "health_insurance"],
      title: "Benefits",
      type: "object",
      "x-jsf-order": [
        "mental_health_program",
        "life_insurance",
        "health_insurance",
      ],
      "x-jsf-presentation": {
        description:
          "In this section, you can select benefits for your new team member. If you have existing team members in the same country, your new hire will receive the same benefits as those currently provided to other team members there, maintaining benefit equality. If this is your first hire in the country, you may select from the available options below. Your choice will become the standard benefits for any future hires in the country.",
        extra:
          "Prices are listed in U.S. Dollars (USD). However, when benefits are originally priced in local currencies, these amounts are estimates in USD. The final charge in local currency will be determined using the exchange rate at the time of invoicing. The pricing listed is subject to change based on the age of the employee (age banding) and/or plan changes/renewals. Any pricing changes will be communicated in advance.",
        fileDownload:
          "https://employ.niceremote.com/dashboard/file-preview?fileSlug=302a8901-e533-493d-a0f0-382edaa91656",
        inputType: "fieldset",
      },
    },
    bonus_amount: {
      deprecated: true,
      readOnly: true,
      title: "Bonus amount (deprecated)",
      type: ["integer", "null"],
      "x-jsf-errorMessage": {
        type: "Please, use US standard currency format. Ex: 1024.12",
      },
      "x-jsf-presentation": {
        currency: "GBP",
        deprecated: {
          description:
            "Deprecated in favor of 'Bonus Details'. Please, try to leave this field empty.",
        },
        inputType: "money",
      },
    },
    bonus_details: {
      description: "Bonus type, payment frequency, and more.",
      maxLength: 1000,
      title: "Other bonus details",
      type: ["string", "null"],
      "x-jsf-presentation": {
        inputType: "textarea",
      },
    },
    commissions_ack: {
      const: "acknowledged",
      description:
        "I understand that I am required to provide written details of the commission plan to this employee, and upload this document on the platform for record keeping purposes. I acknowledge that Remote will not liable for any claims or losses associated with the commission or bonus plan.",
      title: "Confirm commission plan details",
      type: "string",
      "x-jsf-presentation": {
        inputType: "checkbox",
      },
    },
    commissions_details: {
      description: "Payment amount, frequency, and more.",
      maxLength: 1000,
      title: "Commission details",
      type: ["string", "null"],
      "x-jsf-presentation": {
        inputType: "textarea",
      },
    },
    compensation_currency_code: {
      const: "GBP",
      default: "GBP",
      description: "The currency you want the employee to be paid in.",
      enum: ["GBP"],
      oneOf: [
        {
          const: "GBP",
          title: "Pound Sterling (GBP)",
        },
      ],
      title: "Contract currency",
      type: "string",
      "x-jsf-presentation": {
        inputType: "hidden",
      },
    },
    contract_duration: {
      deprecated: true,
      description:
        "Indefinite or fixed-term contract. If the latter, please state duration and if there's possibility for renewal.",
      maxLength: 255,
      readOnly: true,
      title: "Contract duration (deprecated)",
      type: ["string", "null"],
      "x-jsf-presentation": {
        deprecated: {
          description: "Deprecated field in favor of 'contract_duration_type'.",
        },
        inputType: "text",
      },
    },
    contract_duration_type: {
      oneOf: [
        {
          const: "indefinite",
          title: "Indefinite",
        },
        {
          const: "fixed_term",
          title: "Fixed Term",
        },
      ],
      title: "Contract duration",
      type: "string",
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
    contract_end_date: {
      format: "date",
      maxLength: 255,
      title: "Contract end date",
      type: "string",
      "x-jsf-presentation": {
        inputType: "date",
      },
    },
    equity_compensation: {
      allOf: [
        {
          else: {
            properties: {
              equity_cliff: false,
              equity_vesting_period: false,
              number_of_stock_options: false,
            },
          },
          if: {
            properties: {
              offer_equity_compensation: {
                const: "yes",
              },
            },
            required: ["offer_equity_compensation"],
          },
          then: {
            properties: {
              equity_cliff: {
                type: ["number"],
              },
              equity_vesting_period: {
                type: ["number"],
              },
              number_of_stock_options: {
                type: ["string"],
              },
            },
            required: [
              "equity_cliff",
              "equity_vesting_period",
              "number_of_stock_options",
            ],
          },
        },
      ],
      description:
        "This is for tracking purposes only. Employment agreements will not include equity compensation. To offer equity, you need to work with your own lawyers and accountants to set up a plan that covers your team members.",
      properties: {
        equity_cliff: {
          description:
            "When the first portion of the stock option grant will vest.",
          maximum: 100,
          minimum: 0,
          title: "Cliff (in months)",
          type: ["number", "null"],
          "x-jsf-presentation": {
            inputType: "number",
          },
        },
        equity_vesting_period: {
          description:
            "The number of years it will take for the employee to vest all their options.",
          maximum: 100,
          minimum: 0,
          title: "Vesting period (in years)",
          type: ["number", "null"],
          "x-jsf-presentation": {
            inputType: "number",
          },
        },
        number_of_stock_options: {
          description: "Tell us the type of equity you're granting as well.",
          maxLength: 255,
          title: "Number of options, RSUs, or other equity granted",
          type: ["string", "null"],
          "x-jsf-presentation": {
            inputType: "text",
          },
        },
        offer_equity_compensation: {
          oneOf: [
            {
              const: "yes",
              title: "Yes",
            },
            {
              const: "no",
              title: "No",
            },
          ],
          title: "Offer equity compensation?",
          type: "string",
          "x-jsf-presentation": {
            direction: "row",
            inputType: "radio",
          },
        },
      },
      required: ["offer_equity_compensation"],
      title: "Offer equity compensation?",
      type: "object",
      "x-jsf-order": [
        "offer_equity_compensation",
        "number_of_stock_options",
        "equity_cliff",
        "equity_vesting_period",
      ],
      "x-jsf-presentation": {
        inputType: "fieldset",
      },
    },
    experience_level: {
      description:
        "Please select the experience level that aligns with this role based on the job description (not the employees overall experience).",
      oneOf: [
        {
          const:
            "Level 2 - Entry Level - Employees who perform operational tasks with an average level of complexity. They perform their functions with limited autonomy",
          description:
            "Employees who perform operational tasks with an average level of complexity. They perform their functions with limited autonomy",
          title: "Level 2 - Entry Level",
        },
        {
          const:
            "Level 3 - Associate - Employees who perform independently tasks and/or with coordination and control functions",
          description:
            "Employees who perform independently tasks and/or with coordination and control functions",
          title: "Level 3 - Associate",
        },
        {
          const:
            "Level 4 - Mid-Senior level - Employees with high professional functions, executive management responsibilities, who supervise the production with an initiative and operational autonomy within the responsibilities delegated to them",
          description:
            "Employees with high professional functions, executive management responsibilities, who supervise the production with an initiative and operational autonomy within the responsibilities delegated to them",
          title: "Level 4 - Mid-Senior level",
        },
        {
          const:
            "Level 5 - Director - Directors perform functions of an ongoing nature that are of significant importance for the development and implementation of the company's objectives",
          description:
            "Directors perform functions of an ongoing nature that are of significant importance for the development and implementation of the company's objectives",
          title: "Level 5 - Director",
        },
        {
          const:
            "Level 6 - Executive - An Executive is responsible for running an organization. They create plans to help their organizations grow",
          description:
            "An Executive is responsible for running an organization. They create plans to help their organizations grow",
          title: "Level 6 - Executive",
        },
      ],
      title: "Experience level",
      type: "string",
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
    has_bonus: {
      description: "These can include things like performance-related bonuses.",
      oneOf: [
        {
          const: "yes",
          title: "Yes",
        },
        {
          const: "no",
          title: "No",
        },
      ],
      title: "Offer other bonuses?",
      type: "string",
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
    has_commissions: {
      description:
        "You can outline your policy and pay commission to the employee on the platform. However, commission will not appear in the employment agreement. Please send full policy details directly to the employee.",
      oneOf: [
        {
          const: "yes",
          title: "Yes",
        },
        {
          const: "no",
          title: "No",
        },
      ],
      title: "Offer commission?",
      type: "string",
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
    has_signing_bonus: {
      description:
        "This is a one-time payment the employee receives when they join your team.",
      oneOf: [
        {
          const: "yes",
          title: "Yes",
        },
        {
          const: "no",
          title: "No",
        },
      ],
      title: "Offer a signing bonus?",
      type: "string",
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
    part_time_salary_confirmation: {
      const: "acknowledged",
      description:
        "We'll include the salary in the employment agreement, so please double-check that it's correct.",
      title: "I confirm the salary is adjusted for part-time hours.",
      type: ["string", "null"],
      "x-jsf-presentation": {
        inputType: "checkbox",
      },
    },
    pension_percentage: {
      description:
        "What is the pension fund percentage you'd like to contribute on the employer side? Minimum monthly contribution of 4%.",
      minimum: 4,
      title: "Pension fund percentage",
      type: "number",
      "x-jsf-errorMessage": {
        minimum: "Pension fund percentage must be at least 4%",
      },
      "x-jsf-presentation": {
        inputType: "number",
        placeholder: "%",
      },
    },
    probation_length: {
      description:
        "In the United Kingdom, probation periods can last up to 6 months.",
      maximum: 6,
      minimum: 0,
      title: "Probation period, in months",
      type: "number",
      "x-jsf-errorMessage": {
        maximum: "Must be no more than 6 months",
        minimum: "Must be at least 0 months",
      },
      "x-jsf-presentation": {
        inputType: "number",
      },
    },
    role_description: {
      description:
        "Please add at least 3 responsibilities, at least 100 characters in total.",
      maxLength: 10000,
      minLength: 100,
      title: "Role description",
      type: "string",
      "x-jsf-presentation": {
        inputType: "textarea",
      },
    },
    signing_bonus_amount: {
      title: "Signing bonus amount",
      type: ["integer", "null"],
      "x-jsf-errorMessage": {
        type: "Please, use US standard currency format. Ex: 1024.12",
      },
      "x-jsf-presentation": {
        currency: "GBP",
        inputType: "money",
      },
    },
    supervisor_name: {
      description:
        "The person who will be listed as this employee's supervisor in their employment agreement.",
      maxLength: 255,
      title: "Supervisor's name",
      type: "string",
      "x-jsf-presentation": {
        inputType: "text",
      },
    },
    work_address_is_home_address: {
      oneOf: [
        {
          const: "yes",
          title: "Same as their residential address",
        },
        {
          const: "no",
          title: "Different than their residential address",
        },
      ],
      title: "Employee's work address",
      type: "string",
      "x-jsf-presentation": {
        direction: "column",
        inputType: "radio",
      },
    },
    work_hours_per_week: {
      description:
        "The standard work week for a full-time employee in the United Kingdom is 35 hours.",
      title: "Work hours per week",
      type: "number",
      "x-jsf-presentation": {
        inputType: "number",
      },
    },
    work_schedule: {
      oneOf: [
        {
          const: "full_time",
          title: "Full-time",
        },
        {
          const: "part_time",
          title: "Part-time",
        },
      ],
      title: "Type of employee",
      type: "string",
      "x-jsf-presentation": {
        inputType: "radio",
      },
    },
  },
  required: [
    "annual_gross_salary",
    "available_pto",
    "contract_duration_type",
    "equity_compensation",
    "experience_level",
    "has_bonus",
    "has_commissions",
    "has_signing_bonus",
    "pension_percentage",
    "probation_length",
    "role_description",
    "supervisor_name",
    "work_address_is_home_address",
    "work_hours_per_week",
    "benefits",
  ],
  type: "object",
  "x-jsf-order": [
    "contract_duration",
    "contract_duration_type",
    "contract_end_date",
    "work_schedule",
    "work_hours_per_week",
    "probation_length",
    "available_pto_type",
    "available_pto",
    "role_description",
    "supervisor_name",
    "experience_level",
    "pension_percentage",
    "work_address_is_home_address",
    "compensation_currency_code",
    "annual_gross_salary",
    "part_time_salary_confirmation",
    "has_signing_bonus",
    "signing_bonus_amount",
    "has_bonus",
    "bonus_amount",
    "bonus_details",
    "has_commissions",
    "commissions_details",
    "commissions_ack",
    "equity_compensation",
    "benefits",
  ],
};
