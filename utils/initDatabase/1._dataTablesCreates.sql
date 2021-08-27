DROP DATABASE IF EXISTS plc_db;
CREATE DATABASE plc_db;
USE plc_db;


DROP TABLE IF EXISTS tag_type;
CREATE TABLE tag_type (
  -- specific fields
  id          INT             NOT NULL    AUTO_INCREMENT,
  type        ENUM('string', 'boolean', 'float', 'integer')    NOT NULL,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,

  -- keys
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS tag;
CREATE TABLE tag (
  -- specific fields
  id          INT             NOT NULL    AUTO_INCREMENT,
  name        VARCHAR(100)    NOT NULL,
  scope       VARCHAR(100)    NOT NULL,
  type_id     INT             NOT NULL,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,

  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (type_id) REFERENCES tag_type (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS string_tag;
CREATE TABLE string_tag (
  -- specific fields
  id          INT             NOT NULL    AUTO_INCREMENT,
  tag_id      INT             NOT NULL,
  value       VARCHAR(100)    NOT NULL,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,

  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (tag_id) REFERENCES tag (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS float_tag;
CREATE TABLE float_tag (
  -- specific fields
  id          INT             NOT NULL    AUTO_INCREMENT,
  tag_id      INT             NOT NULL,
  value       FLOAT(5,2)         NOT NULL,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,

  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (tag_id) REFERENCES tag (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS boolean_tag;
CREATE TABLE boolean_tag (
  -- specific fields
  id          INT             NOT NULL    AUTO_INCREMENT,
  tag_id      INT             NOT NULL,
  value       BOOLEAN         NOT NULL,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,

  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (tag_id) REFERENCES tag (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS integer_tag;
CREATE TABLE integer_tag (
  -- specific fields
  id          INT             NOT NULL    AUTO_INCREMENT,
  tag_id      INT             NOT NULL,
  value       INT         NOT NULL,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,

  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (tag_id) REFERENCES tag (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS request_history;
CREATE TABLE request_history (
  -- specific fields
  id           INT            NOT NULL    AUTO_INCREMENT,
  tag_id       INT            NOT NULL,
  value_id     INT            NOT NULL,
  status       ENUM('queued','sent','pending','errored') NOT NULL DEFAULT 'queued',
  priority     INT            NOT NULL    DEFAULT 0,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on   TIMESTAMP      NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_on  TIMESTAMP      NOT NULL    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (tag_id) REFERENCES tag (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
