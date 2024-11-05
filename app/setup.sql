CREATE APPLICATION ROLE IF NOT EXISTS app_user;
CREATE SCHEMA IF NOT EXISTS core;
GRANT USAGE ON SCHEMA core TO APPLICATION ROLE app_user;

CREATE OR REPLACE PROCEDURE core.register_single_callback(ref_name string, operation string, ref_or_alias string)
 returns string
 language sql
 as $$
      begin
      case (operation)
         when 'ADD' then
            select system$set_reference(:ref_name, :ref_or_alias);
         when 'REMOVE' then
            select system$remove_reference(:ref_name);
         when 'CLEAR' then
            select system$remove_reference(:ref_name);
         else
            return 'Unknown operation: ' || operation;
      end case;
      return 'Operation ' || operation || ' succeeds.';
      end;
   $$;

GRANT USAGE ON PROCEDURE core.register_single_callback(string, string, string)
  TO APPLICATION ROLE app_user;

CREATE OR REPLACE PROCEDURE core.register_multi_reference(ref_name STRING, operation STRING, ref_or_alias STRING)
  RETURNS STRING
  LANGUAGE SQL
  AS $$
    BEGIN
      CASE (operation)
        WHEN 'ADD' THEN
          SELECT SYSTEM$ADD_REFERENCE(:ref_name, :ref_or_alias);
        WHEN 'REMOVE' THEN
          SELECT SYSTEM$REMOVE_REFERENCE(:ref_name, :ref_or_alias);
        WHEN 'CLEAR' THEN
          SELECT SYSTEM$REMOVE_ALL_REFERENCES(:ref_name);
      ELSE
        RETURN 'unknown operation: ' || operation;
      END CASE;
      RETURN NULL;
    END;
  $$;

GRANT USAGE ON PROCEDURE core.register_multi_reference(STRING, STRING, STRING) TO APPLICATION ROLE app_user;

CREATE OR REPLACE PROCEDURE core.get_config_for_ref(ref_name STRING)
    RETURNS STRING
    LANGUAGE SQL
    AS
    $$
    BEGIN
      CASE (ref_name)
        WHEN 'CONSUMER_EXTERNAL_ACCESS' THEN
          RETURN CONCAT('{"type": "CONFIGURATION","payload":{"host_ports":["', (SELECT host FROM core.hosts LIMIT 1), '"]}}');
        WHEN 'CATALOG_TEST' THEN
          RETURN '{"type": "CONFIGURATION","payload":{"catalog_source":"object_store","table_format":"iceberg","enabled": true,"comment":"foobar"}}';
  END CASE;
  RETURN '';
  END;
  $$;

GRANT USAGE ON PROCEDURE core.get_config_for_ref(string)
  TO APPLICATION ROLE app_user;
