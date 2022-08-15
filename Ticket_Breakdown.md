# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Tentative ER Definitions

Facilities
- facility_id
- name
- address
- poc_name
- phone_number

Agents
- agent_id
- name
- phone_number
- address

Shifts
- shift_id
- facility_id
- agent_id
- shift_start
- shift_end


function getShiftByFacility(facilityId) {
    const shifts = []

    if(facilityId) {
        // Check if Facility Exists then

        // Get Shifts worked that quarter, including some metadata about the Agent assigned to each
        const dataFromDB = db.Query("select * from Shifts s INNER JOIN Agents where shift_start >= 'Start of Q' and shift_end <= 'End of Quarter' and facility_id = ${facilityId}")
        shifts = [...dataFromDB]
    }

    return shifts
}

Thoughts
- An agent can work with many facilities
- Facilities and Agents have many to many relationship which is being connected via Shifts table which defines the complete relationship
- A custom agent id can be defined in Shifts table but it won't be normalized as such
- We can create a custom table to map system's agent_id with custom facility's agent ids


FacilityAgent
- id
- facility_id (FK)
- agent_id (FK)
- custom_agent_id


Tickets


TICKET 1 (LOW Effort)

Tasks
- Create a new table FacilityAgent as mentioned above with `agent_id`, `facility_id` and `custom_agent_id` 
- Add appropriate indexes to make sure that agent and facility is not mapped more than once
- `custom_agent_id` will be an optional field and can store any value, a string/varchar datatype can be used to support hexadecimal values


TICKET 2 (MEDIUM Effort)

Tasks
- Make changes to `getShiftsByFacility` function to return this additional `custom_agent_id` whenever it is available for the corresponding Agent working at that Facility
- Make changes to `generateReport` function to add another column of `custom_agent_id` and keep the `agent_id` column for cases where mapping of custom_agent_id is not done somehow 
- Make appropriate changes to the API so that the mapping is saved in the FacilityAgent table
- Add a feature flag to globally disable this feature, can be extensible to allow facility level toggle
- Updating unit tests for these methods wherever required, existing functionality should not be broken


TICKET 3 (MEDIUM Effort)

Tasks
- Add an option on the Facility's dashboard or internal dashboards to attach their custom key
- Build an uploader to accept CSV files in case of bulk mapping
- Create additional API to power bulk uploading efficiently for large files


TICKET 4 (LOW Effort)

Tasks
- Migration of these tables to production databases